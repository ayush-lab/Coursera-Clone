import axios from './axiosUrl';

class ProductApi {

    Product(data) {
        return axios.get('/posts',data)
        .then(response => {console.log('Response:', response) 
                if(response.status ===201 || response.status ===200){
                    localStorage.setItem('token', response.data.token) 
                    console.log(response.data.token);
                    alert(response.data.message);
                    }
                    // this.setState({ redirect: "/signup/otp" });}
                else 
                    alert("Something went wrong")})

            .catch(error=>{console.log(error); alert("Something went wrong")} );
    }

    


}

export default new ProductApi();