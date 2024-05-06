import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// --------------------------------------------------------------
// HTTP Clients
// --------------------------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class TaskClient {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskListDto> {
    return this.http.get<TaskListDto>(`${this.apiUrl}/api/tasks/all`);
  }

  addTask(task: Task): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/tasks/add`, task);
  }

  updateTask(task: Task): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/api/tasks/update`, task);
  }

  deleteTask(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/tasks/delete/${id}`);
  }

  getTaskById(id: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.apiUrl}/api/tasks/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserClient {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserListDto> {
    return this.http.get<UserListDto>(`${this.apiUrl}/api/users/all`);
  }

  addUser(user: CreateUser): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/users/add`, user);
  }

  updateUser(user: User): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/api/users/update`, user);
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/users/delete/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthClient {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/auth/login`, { email, password });
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/auth/logout`, {});
  }

  register(user: RegisterUser): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/auth/register`, user);
  }
}

// --------------------------------------------------------------
// Enums
// --------------------------------------------------------------

export enum Priority {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum UserRoles {
  Standard = 'STANDARD',
  Admin = 'ADMIN',
}

// --------------------------------------------------------------
// Models
// --------------------------------------------------------------

export interface Task {
  owner: string;
  title: string;
  description: string;
  done: boolean;
  dueDate: Date;
  priority: Priority;
}

export interface BaseUser {
  email: string;
  name: string;
}

export interface SessionUser extends BaseUser {
  id: string;
  role: UserRoles;
}

export interface CreateUser extends BaseUser {
  password: string;
  role: UserRoles;
}

export interface User extends BaseUser {
  id: string;
  password: string;
  role: UserRoles;
}

export interface RegisterUser extends BaseUser {
  password: string;
}

// --------------------------------------------------------------
// DTOs
// --------------------------------------------------------------

export interface TaskDto extends Task {
  id: string;
}

export interface TaskListDto {
  tasks: TaskDto[];
}

export interface UserDto extends BaseUser {
  id: string;
}

export interface UserListDto {
  users: UserDto[];
}


