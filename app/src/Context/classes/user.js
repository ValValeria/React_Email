export class User{
    constructor(){
        this.isLogged = false;
        this.email = this.password = "";
        this.schedules = []
    }

    setUser(user){
        Object.assign(this,user)
        this.isLogged = true;
        console.log(this)
    }
}