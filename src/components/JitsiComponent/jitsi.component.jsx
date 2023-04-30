import React, { Component } from 'react';
import styles from './ToolBarButtons.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone,faMicrophoneSlash, faVideo, faVideoSlash, faPhoneSlash , faHand, faComment,faCommentSlash, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import {faHand as faHandreg  } from '@fortawesome/free-regular-svg-icons'

class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    constructor(props) {
        super(props);
        // this.props = props;
        // this.state = this.props.history.state;
        this.state = this.props.history.location.state;

        // this.state = {
        //     room: 'bwb-jgyjgy-vmg',
        //     user: {
        //         name: 'Artem'
        //     },
        //     isAudioMuted: false,
        //     isVideoMuted: false
        // }

    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: 500,
            configOverwrite: { prejoinPageEnabled: false},
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                    'closedcaptions',  'fullscreen',
                    'fodeviceselection', 'profile', 'recording',
                    'livestreaming', 'etherpad', 'settings',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview'
                ],
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }
    

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        // const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        // const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        // const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        
        console.log(this.props);

        return this.props.history.push('/thank-you');
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command) {
        this.api.executeCommand(command);;
        if(command === 'hangup') {
            // console.log(this.props);
            
            return this.props.history.push('/thank-you');
        }

        if(command === 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }
        if(command === 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if(command === 'toggleRaiseHand') {
            this.setState({ isRaiseHand: !this.state.isRaiseHand });
        }
        if(command === 'toggleChat') {
            this.setState({ isChatShown: !this.state.isChatShown });
        }
    }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted, isRaiseHand ,isChatShown} = this.state;

        return (
            // <a href="/" target="_blank" rel="noopener noreferrer">dsadsdas
       
            <>
            <header className="nav-bar">
                <p className="item-left heading"/>
            </header>
            <div id="jitsi-iframe"></div>
            <div class="item-center">
            </div>
            <div class="item-center">
                <span>&nbsp;&nbsp;</span>
                <button className={styles.btn} onClick={ () => this.executeCommand('toggleAudio') }   title="Mute / Unmute">
                {isAudioMuted ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} /> }
                </button>
                
                <button className={styles.btn} onClick={ () => this.executeCommand('toggleVideo') }  title="Start / Stop camera">
                {isVideoMuted ? <FontAwesomeIcon icon={faVideoSlash} /> : <FontAwesomeIcon icon={faVideo} /> }
                </button>
                <button className={styles.btn} onClick={ () => this.executeCommand('toggleRaiseHand') } title="Rise your hand">
                {isRaiseHand? <FontAwesomeIcon icon={faHandreg} /> : <FontAwesomeIcon icon={faHand}/> }
                </button>
                <button className={styles.btn} onClick={ () => this.executeCommand('toggleShareScreen') } title="Share your screen">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                </button>
                <button className={styles.btn} onClick={ () => this.executeCommand('toggleChat') } title="Show chat">
                    {isChatShown? <FontAwesomeIcon icon={faCommentSlash} /> :  <FontAwesomeIcon icon={faComment} />}
                </button>
                <button className={styles.btn_hangUp} onClick={ () => this.executeCommand('hangup') }  title="Leave">
                <FontAwesomeIcon icon={faPhoneSlash} />
                </button>
            
            </div>

            </>
    //   </a>

        );
    }
}

export default JitsiComponent;