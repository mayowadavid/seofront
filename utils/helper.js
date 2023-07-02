import axios from 'axios';
import AWN from "awesome-notifications"
const utils =  {
    async Axios(method, url, data, download) {
        // console.log(method, url, data)
        const env = useRuntimeConfig();
          const token = localStorage.getItem("token") || '';
          const baseUrl = env.API_BASE_URL;
          url = baseUrl + url;
          data =  data || {};
          let headers = {Accept: 'application/json',
                  'content-Type': 'application/json',
              'authorization': `bearer ${token}` }
          
          try {
              if(method == 'get' && download){
                  const config = {
                      url,
                      method,
                      headers,
                      responseType: 'blob',
                  };
                  return axios(config);
              } else if(method == 'get'){
                const config = {
                    url,
                    method,
                    headers
                };
                return axios(config);
            } else {
                  const config = {
                      url,
                      method,
                      data,
                      headers
                  };
                  return await axios(config);
              }
              
          }catch(e){
            AwnNotify('failed', 'alert');
              console.log(e)
          }
      },

    async AwnNotify (message, type) {
        let globalOptions =  { position: 'top-left' };
        let notifier = new AWN(globalOptions)
        type == 'success' && notifier.success(message);
        type == 'alert' && notifier.alert(message);
      }
}
 
export default utils;