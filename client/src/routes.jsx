import React, { lazy, Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import NotFound from './pages/NotFound';
import BackOfficeLayout from './backoffice/layout/BackOfficeLayout';

const Home = lazy(() => import('./pages/Home'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const UserInfo = lazy(() => import('./pages/Profile/UserInfo'));
const Setting = lazy(() => import('./pages/Profile/Setting'));
const Orders = lazy(() => import('./pages/Profile/Orders'));
const Addresses = lazy(() => import('./pages/Profile/Addresses'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const CheckOut = lazy(() => import('./pages/CheckOut'));

// BackOffice Components
const Dashboard = lazy(() => import('./backoffice/pages/Dashboard'))
const Product = lazy(() => import('./backoffice/pages/Product/Product'))
const CreateProduct = lazy(() => import('./backoffice/pages/Product/CreateProduct'))
const User = lazy(() => import('./backoffice/pages/User'))

const SuspenseFallback = () => <div>Loading...</div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/home'} />,
            },
            {
                path: 'home',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'product/:product_slug',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <ProductPage />
                    </Suspense>
                ),
            },
            {
                path: 'shop',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <ShopPage />
                    </Suspense>
                ),
            },
            {
                path: 'check-out',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <CheckOut />
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <Profile />
                    </Suspense>
                ),
                children: [
                    {
                        path: 'user-info', // Corrected path
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <UserInfo />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'orders', // Corrected path
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <Orders />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'addresses', // Corrected path
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <Addresses />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'setting', // Corrected path
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <Setting />
                            </Suspense>
                        ),
                    },
                ]
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login', // Corrected path
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <Login />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/admin',
        element: <BackOfficeLayout />,
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: 'products',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <Product />
                    </Suspense>
                ),
            },
            {
                path: 'products/new',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <CreateProduct />
                    </Suspense>
                )
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <User />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
