import HomePage from "../pages/HomePage/HomePage";
import NotfoundPage from "../pages/NotfoundPage/NotfoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profiles/ProfilesPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

export const routes =[
    {
        path:'/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path:'/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path:'/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path:'/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,
    },
    {
        path:'/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path:'/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path:'/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path:'/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path:'/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path:'/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path:'/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path:'*',
        page: NotfoundPage
    }
]