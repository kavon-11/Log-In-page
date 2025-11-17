import { redirect } from 'react-router-dom';

export default function getToken() {
    return localStorage.getItem('token');
}

export function ISValidTokenLoader() {
    const token = getToken();
    if (!token) {
        return redirect('/auth');
    }
    return token;
}
export function removeToken() {
    localStorage.removeItem('token');
    return redirect('/auth');
}

export function loader() {
    const token = getToken();
    return token;
}