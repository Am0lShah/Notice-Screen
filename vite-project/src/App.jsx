import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Advertisement from './components/Advertisement.jsx';
import ImportantNotice from './components/ImportantNotice.jsx';
import VideoImageSection from './components/VideoImageSection.jsx';
import RegularAnnouncement from './components/RegularAnnouncement.jsx';

import { io } from 'socket.io-client';

  let socket;    
function App() {
    // const user=useSelector((state) => state.auth.user);
  const [name,setName]=useState('');

    const deviceSocket=()=>{
        socket = io('https://kiosk-backend-14wu.onrender.com', {
        auth: {name:name,groupName:'xxxx' },
        transports: ['websocket', 'polling'], // Enable fallback
        reconnectionAttempts: 3,
        withCredentials: true,
        autoConnect: true
      });
    }
    
//     useEffect(() => {
//         if(!user){
//               socket?.emit("join_room", { groupName: "room123" }); // Same name as server expects

//         }
// }, []);

    useEffect(()=>{

        // let socket;
        // if(!user){
        //     deviceSocket();
        // }else{
        // //  socket = connectSocket(localStorage.getItem('token'));
        // return ;
        // }

        deviceSocket();


        socket.on('connect', () => console.log('Socket connected!'));

        socket.on('receive_message', (newMessage) => {
    //   setMessages(prev => [...prev, newMessage]);

    console.log(newMessage);
    
    });
        // console.log("socket connected");
        // console.log(socket);
        // socket.on("hi",(data)=>{
        //     console.log(data);
            
        // })
        
        console.log("h");
        
        return () => {
      socket.disconnect();
    };
    },[name])


    const handleGroupIdChange = (e) => {
    setName(e.target.value);
  };


  const clickset=()=>{
    deviceSocket();
  }
    return<>
    <h1>Notice !</h1>
    <input
        type="text"
        value={name}
        onChange={handleGroupIdChange}
        placeholder="Group ID"
        className="w-full my-2 py-2 pl-10 text-sm text-gray-700 bg-white rounded-lg focus:outline-none border-1 border-red-100"
      />
        <div className="w-screen h-screen flex flex-col bg-gray-100 overflow-hidden">
      
      {/* Important Notice Section - Red Banner */}
      <div className="bg-red-600 text-white flex justify-center items-center h-[10vh] min-h-[60px]">
        <ImportantNotice />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 w-full flex-col md:flex-row">
        
        {/* Video/Image Section - Left Column */}
        <div className="md:w-2/3 w-full bg-cyan-200 flex justify-center items-center h-[45vh] md:h-full">
          <VideoImageSection />
        </div>

        {/* Regular Announcement Section - Right Column */}
        <div className="md:w-1/3 w-full bg-green-600 text-white flex justify-center items-center h-[45vh] md:h-full">
          <RegularAnnouncement />
        </div>
      </div>

      {/* Advertisement Section - Black Banner */}
      <div className="bg-black text-white flex justify-center items-center h-[10vh] min-h-[60px]">
        <Advertisement />
      </div>
      
    </div>
    </>
}



export default App;

