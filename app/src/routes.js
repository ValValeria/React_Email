import Main from './Pages/Main/Main.jsx'
import Schedule from './Pages/Schedule/Schedule.jsx'
import Posts from './Pages/Posts/Posts'

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
        path:"",
        component:Main,
    }
]

