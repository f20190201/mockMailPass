import React, { useEffect, useState } from "react";
import "./CardList.css";
import axios from "axios";
import DotPulseLoader from "../DotPulseLoader";

const CardList = ({ email, password, isRefetchClicked, setIsRefetchClicked }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [login, domain] = email.split('@');
  const [latestMessageData, setLatestMessageData] = useState(null);
  const [displayNoMessageFound, setDisplayNoMessageFound] = useState(false);

  const getMessagesOptions = {
    method: 'GET',
    url: 'https://temp-mail99.p.rapidapi.com/',
    params: {
      action: 'getMessages',
      login: login,
      domain: domain
    },
    headers: {
      'x-rapidapi-key': '98d3df4ce3msh8b1a778494b6043p14eafbjsn3f58f2ec6d93',
      'x-rapidapi-host': 'temp-mail99.p.rapidapi.com'
    }
  };

  const readMessageOptions = (messageId) => ({
    method: 'GET',
    url: 'https://temp-mail99.p.rapidapi.com/',
    params: {
      action: 'readMessage',
      login: login,
      domain: domain,
      id: messageId
    },
    headers: {
      'x-rapidapi-key': '98d3df4ce3msh8b1a778494b6043p14eafbjsn3f58f2ec6d93',
      'x-rapidapi-host': 'temp-mail99.p.rapidapi.com'
    }
  });

  const getMessageData = async (messageId) => {
    try {
        const response = await axios.request(readMessageOptions(messageId));
        console.log(response.data.textBody);
        setLatestMessageData([{id: messageId, text: response.data.htmlBody}]);
        setIsRefetchClicked(false);
        return response.data.textBody;
    } catch (error) {
        console.error(error);
    }
  }

  const filterLatestMessage = (messageArray, fromRefetch) => {
    
    if(messageArray.length) {
        const messageId = messageArray[0].id;
        getMessageData(messageId);
    } else {
        if(fromRefetch) {
            setDisplayNoMessageFound(true);
            setIsRefetchClicked(false);
        }
    }
  }

  const handleGetMessages = async (fromRefetch = false) => {
    try {
        const response = await axios.request(getMessagesOptions);
        filterLatestMessage(response.data, fromRefetch);
    } catch (error) {
        console.error(error);
    }
  }

  const handleClick = (id) => {
    setExpandedCard(id);
  };

  const fetchInbox = () => {
    let count = 0;
    const interval = setInterval(() => {
        handleGetMessages();
        count++;
        if(count === 5 || latestMessageData) {
            if(!latestMessageData) {
                setDisplayNoMessageFound(true);
            } else {
                setDisplayNoMessageFound(false);
            }
            clearInterval(interval)
        }
    }, 5000)
  }



  useEffect(() => {
    fetchInbox();
    return () => fetchInbox;
  }, []);

  useEffect(() => {
    if(isRefetchClicked) {
        setLatestMessageData(null);
        setDisplayNoMessageFound(false);
        handleGetMessages(true);
    }
  }, [isRefetchClicked])


  return (
    <div className="card-list">

        {latestMessageData ? latestMessageData.map((card) => (
        <div
          key={card.id}
          className={`card ${expandedCard === card.id ? "expanded" : ""}`}
          onClick={() => handleClick(card.id)}
          dangerouslySetInnerHTML={{ __html: card.text }}
        ></div>
      )) : (displayNoMessageFound ? 
      
      <div
      style={{
        fontSize: 'larger'
      }}
      >
        Sorry, No E-mail found 
      </div> : <DotPulseLoader/>)}

      
    </div>
  );
};

export default CardList;
