import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private axiosService: AxiosService) {}

    async register(username: string, name: string, password: string) {
        try {
            return this.axiosService
                .request('POST', '/api/v1/auth/register', {
                    login: username,
                    name: name,
                    password: password,
                })
                .then(response => {
                    this.axiosService.setAuthToken(response.data.token);
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async login(username: string, password: string) {
        try {
            return this.axiosService
                .request('POST', '/api/v1/auth/login', {
                    login: username,
                    password: password,
                })
                .then(response => {
                    this.axiosService.setAuthToken(response.data.token);
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async logoutUser() {
        try {
            return this.axiosService.logout();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getProfile() {
        try {
            return this.axiosService
                .request('GET', '/api/v1/user/get_user_and_sales', {})
                .then(response => {
                    return response;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getAllProducts(search?: String, pageNumber?: number) {
        if (!search) {
            search = '';
        }
        try {
            return this.axiosService
                .request(
                    'GET',
                    `/api/v1/product/get_products?search=${search}&page=${pageNumber}`,
                    {}
                )
                .then(response => {
                    return response.data;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async createProduct(product: any) {
        try {
            return this.axiosService
                .request('POST', '/api/v1/product/add_product', product)
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async deleteProduct(id: number) {
        try {
            return this.axiosService
                .request('DELETE', `/api/v1/product/delete_product/${id}`, {})
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async updateProduct(id: number, product: any) {
        try {
            return this.axiosService
                .request('PUT', `/api/v1/product/update_product/${id}`, product)
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getSales(
        filterByCashier?: boolean,
        searchId?: string,
        dateFilter?: string,
        pageNumber?: number
    ) {
        try {
            return this.axiosService
                .request(
                    'GET',
                    `/api/v1/transaction/get_transactions?filterByCashier=${filterByCashier}&transactionId=${searchId}&transactionDate=${dateFilter}&page=${pageNumber}`,
                    {}
                )
                .then(response => {
                    return response.data;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addSale(sale: any) {
        try {
            return this.axiosService
                .request('POST', '/api/v1/transaction/add_transaction', sale)
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async updateSale(id: number, sale: any) {
        try {
            return this.axiosService
                .request(
                    'PUT',
                    `/api/v1/transaction/update_transaction/${id}`,
                    sale
                )
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async deleteSale(id: number) {
        try {
            return this.axiosService
                .request(
                    'DELETE',
                    `/api/v1/transaction/delete_transaction/${id}`,
                    {}
                )
                .then(response => {
                    return response.status;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getSale(id: number) {
        try {
            return this.axiosService
                .request('GET', `/api/v1/transaction/get_transaction/${id}`, {})
                .then(response => {
                    return response.data;
                });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
