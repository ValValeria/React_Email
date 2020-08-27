import Main from './Pages/Main/Main.jsx'
import Schedule from './Pages/Schedule/Schedule.jsx'
import Posts from './Pages/Posts/Posts'
import AuthPage from './Pages/AuthPage/AuthPage.jsx'

export default [
    {
        path:"/",
        component:Main,
        exact:true,
    },
    {
        path:"/sendmail",
        component:Schedule,
        exact:true,
    },
    {
        path:"/signup",
        component:AuthPage,
        exact:true,
    },
    {
        path:"/login",
        component:AuthPage,
        exact:true,
    },
    {
        path:"/posts",
        component:Posts,
        exact:true,
    },
    {
        path:"",
        component:Main,
    }
]

