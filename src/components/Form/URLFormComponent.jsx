
import styles from './URLFormComponent.module.css';
import { Component } from 'react';

// function getUsernameFromUrl(){
//     return 'USERNAME';
// };
function getRoomFromUrl(url){
    let arr=[];
    arr = url.split('/')
    return arr[arr.length-1];
};

// function getEmailFromUrl(){
    
// }

// function getDomainName(){
    
// }
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  




class URLFormComponent extends Component{

    
    constructor(props) {
        super(props);
        // const [url,setUrl] = useState('');

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.setConfig = this.setConfig.bind(this);

        this.state = {
            room: 'rs',
            user: {
                name: 'User',
                email:'testEmail@gmail.com'
            },
            url:'',
            isAudioMuted: false,
            isVideoMuted: false,
            isRaiseHand: false,
            isChatShown: false
        }
        

    }
    setConfig = (e) => {

        this.setState({ url: e.target.value , room: getRoomFromUrl(e.target.value)})
    };

   
    onSubmitHandler = (e) => {
        e.preventDefault();

        if(validURL(this.state.url)){
        //     if(this.url.includes('meet.jit.si') || this.url.includes('bigbluebutton.org')){
        //         // setConference({
        //         //     url: url,
        //         //     username: getUsernameFromUrl(),
        //         //     room: getRoomFromUrl(url),
        //         //     email: getEmailFromUrl(),
        //         //     domenName: getDomainName()
        //         // });
        //     }
        if (this.state.url.includes('meet.jit.si')) {
                return this.props.history.push({pathname: '/jitsi', state: this.state});
        }
        else if(this.state.url.includes('bigbluebutton.org')){
            //soon add bigBlueButton
            return this.props.history.push({pathname: '/', state: this.state});
        }
            
        }
        this.setState({url: ''});
    };



      render() {
        return(

            <div className={styles.videoConferenceURLForm}>
                <form onSubmit={this.onSubmitHandler}>
                    <input type='text' value={this.state.url} onChange = {(e)=> this.setConfig(e)} placeholder='Enter URL...'/>
                    <button type="subbmit">Start Meeting</button>
                </form>
            </div>
    )
      }
}

export default URLFormComponent;