import { $authHost, $host } from ".";

export const registration = async (email, password, name) => {
    console.log($host);
    const response = await $host.post('/api/user/registration', { email, password, name, role: 'ADMIN' })
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('/api/auth/login', { email, password })
    return response
}
export const check = async () => {
    const response = await $host.post('/api/auth/registration', {})
    return response
}