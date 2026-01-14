import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../constants';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('auth_token');
          // Navigate to login
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.put(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.delete(url, config);
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
  }

  async signup(name: string, email: string, password: string, phone: string) {
    return this.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, { name, email, password, phone });
  }

  async verifyOTP(email: string, otp: string) {
    return this.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
  }

  // Vehicle endpoints
  async addVehicle(vehicleData: any) {
    return this.post(API_CONFIG.ENDPOINTS.VEHICLE.ADD, vehicleData);
  }

  async getVehicles() {
    return this.get(API_CONFIG.ENDPOINTS.VEHICLE.LIST);
  }

  async scanVIN(image: string) {
    return this.post(API_CONFIG.ENDPOINTS.VEHICLE.SCAN_VIN, { image });
  }

  // Diagnostics endpoints
  async runDiagnostic(vehicleId: string) {
    return this.post(API_CONFIG.ENDPOINTS.DIAGNOSTICS.SCAN, { vehicleId });
  }

  async getDiagnosticHistory(vehicleId: string) {
    return this.get(`${API_CONFIG.ENDPOINTS.DIAGNOSTICS.HISTORY}?vehicleId=${vehicleId}`);
  }

  // Shop endpoints
  async searchParts(query: string) {
    return this.get(`${API_CONFIG.ENDPOINTS.SHOP.PARTS_SEARCH}?q=${query}`);
  }

  async findNearbyMechanics(lat: number, lng: number) {
    return this.get(`${API_CONFIG.ENDPOINTS.SHOP.MECHANICS_NEARBY}?lat=${lat}&lng=${lng}`);
  }

  // AI endpoints
  async sendChatMessage(message: string, conversationId?: string) {
    return this.post(API_CONFIG.ENDPOINTS.AI.CHAT, { message, conversationId });
  }

  async analyzeImage(image: string) {
    return this.post(API_CONFIG.ENDPOINTS.AI.ANALYZE_IMAGE, { image });
  }
}

export default new ApiService();
