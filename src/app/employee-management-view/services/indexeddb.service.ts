import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

interface Employee {
  id: number;
  name: string;
  role: string;
  startDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class IndexeddbService {
  private db!: IDBPDatabase;

  constructor() {
    this.initDB();
  }

  // Initialize the database
  private async initDB(): Promise<void> {
    this.db = await openDB('EmployeeDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('employees')) {
          db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    console.log('IndexedDB Initialized');
  }

  // Ensure the database is ready
  private async ensureDBInitialized(): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }
  }

  async getEmployeeById(id: number): Promise<Employee | undefined> {
    await this.ensureDBInitialized();
    return await this.db.get('employees', id);
  }

  // Add an employee to the database
  async addEmployee(employee: Employee): Promise<any> {
    await this.ensureDBInitialized();
    return await this.db.add('employees', employee);
  }

  // Get all employees from the database
  async getEmployees(): Promise<Employee[]> {
    await this.ensureDBInitialized();
    return await this.db.getAll('employees');
  }

  // Delete an employee by ID
  async deleteEmployee(id: number): Promise<void> {
    await this.ensureDBInitialized();
    await this.db.delete('employees', id);
  }

  // Update an employee record
  async updateEmployee(employee: Employee): Promise<void> {
    await this.ensureDBInitialized();
    await this.db.put('employees', employee);
  }
}
