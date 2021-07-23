// import { useHistory } from 'react-router'
// const history = useHistory()
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
      token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getTokenAfterRefresh: () => {
				const token = sessionStorage.getItem("token");
				console.log("Reloaded Token!");
				if(token && token!=="" && token !== undefined) {
					setStore({token: token});
				}	
			},

      login: async (username, password) => {
        try {
          const resp = await fetch('/auth/login',{
            method: "POST", 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value
            })
          });
          if(resp.status !== 200) {
						const daa = await resp.json();
						const err = daa.error;
             alert(err);
             return false; 
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token)
          setStore({ token: data.access_token})
          return true;
        }
        catch(error) {
          console.error("ERROR!!!!!!!!!!!!!!!!");
        }
      },

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logged out")
				setStore({token:null})
				// history.push("/");
			}, 

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;