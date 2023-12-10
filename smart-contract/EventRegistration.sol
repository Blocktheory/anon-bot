//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IAnonAadhaarVerifier.sol";

contract EventRegistration {

    struct RegisterUser {
        string userAddress;
        uint256 eventId;
    }

    struct Event {
        uint256 id;
        string name;
        address creator;
    }

    Event[] private events;
    address public anonAadhaarVerifierAddr;
    address public owner;

    //address -> eventID -> checked in or not
    mapping(string => mapping(uint256 => bool) ) public hasCheckedIn;
    mapping(string => mapping(uint256 => bool)) public hasRegistered;
    mapping(string => bool) public IsverifiedUser;
    mapping (string => Event[]) public listOfRegisteredEvents;


    event Registered(address User,uint256 EventId,string EventName);
    event CheckedIn(address User,uint256 EventId,string EventName);


    constructor(address anonaddress){
        owner = msg.sender;
        anonAadhaarVerifierAddr = anonaddress;
    }

    function verify(uint256[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[34] calldata _pubSignals, string memory id) public {
        require (IAnonAadhaarVerifier(anonAadhaarVerifierAddr).verifyProof(_pA, _pB, _pC, _pubSignals),"Not Verified User");
        require(!IsverifiedUser[id] ,"Already Verified");

        IsverifiedUser[id] = true;
    }

    function register(uint256 _eventId , string memory _id) public {
        require(_eventId < events.length, "Invalid proposal index");
        require(!hasCheckedIn[_id][_eventId], "You have already checkedIn");
        require(!hasRegistered[_id][_eventId], "You have already Registered");
        // require(IsverifiedUser[_id], "Verify Your Identity first");
        hasRegistered[_id][_eventId] = true;
        (string memory name, uint256 id, address creator ) =  getEvent(_eventId);
        Event memory newevent = Event({
            id:_eventId,
            name: name,
            creator: creator
        });
        listOfRegisteredEvents[_id].push(newevent);
        emit Registered(msg.sender, id, name);
    }

    function createEvent(string memory _name) public {
        events.push(Event(events.length, _name, msg.sender));
    }

    function getEvent(uint256 _eventId) public view returns (string memory, uint256, address) {
        require(_eventId < events.length, "Invalid Event index");
        Event memory returnevents = events[_eventId];
        return (returnevents.name, returnevents.id, returnevents.creator);
    }

    function checkin(string memory _id, uint256 _eventId) public {
        (string memory name, uint256 id, address creator) =  getEvent(_eventId);
        require(msg.sender == creator, "You are not the creator of event");
        require(_eventId < events.length, "Invalid eventId");
        require(hasRegistered[_id][_eventId], "You have not Registered for this event");
        require(!hasCheckedIn[_id][_eventId], "You have already checkedIn");

        hasCheckedIn[_id][_eventId] = true;
        emit CheckedIn(msg.sender, id, name);
    }

    function getListOfUsers(string memory _id) public view returns(Event[] memory) {
        return listOfRegisteredEvents[_id];
    }
}
Contract address =
0xf782D6F97f36D5ce311982841cFb3299C4bce98F
With verification Conract
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IAnonAadhaarVerifier.sol";

contract EventRegistration {

    struct RegisterUser {
        string userAddress;
        uint256 eventId;
    }

    struct Event {
        uint256 id;
        string name;
        address creator;
    }

    Event[] private events;
    address public anonAadhaarVerifierAddr;
    address public owner;

    //address -> eventID -> checked in or not
    mapping(string => mapping(uint256 => bool) ) public hasCheckedIn;
    mapping(string => mapping(uint256 => bool)) public hasRegistered;
    mapping(string => bool) public IsverifiedUser;
    mapping (string => Event[]) public listOfRegisteredEvents;


    event Registered(address User,uint256 EventId,string EventName);
    event CheckedIn(address User,uint256 EventId,string EventName);


    constructor(address anonaddress){
        owner = msg.sender;
        anonAadhaarVerifierAddr = anonaddress;
    }

    function verify(uint256[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[34] calldata _pubSignals, string memory id) public {
        require (IAnonAadhaarVerifier(anonAadhaarVerifierAddr).verifyProof(_pA, _pB, _pC, _pubSignals),"Not Verified User");
        require(!IsverifiedUser[id] ,"Already Verified");

        IsverifiedUser[id] = true;
    }

    function register(uint256 _eventId , string memory _id) public {
        require(_eventId < events.length, "Invalid proposal index");
        require(!hasCheckedIn[_id][_eventId], "You have already checkedIn");
        require(!hasRegistered[_id][_eventId], "You have already Registered");
        require(IsverifiedUser[_id], "Verify Your Identity first");
        hasRegistered[_id][_eventId] = true;
        (string memory name, uint256 id, address creator ) =  getEvent(_eventId);
        Event memory newevent = Event({
            id:_eventId,
            name: name,
            creator: creator
        });
        listOfRegisteredEvents[_id].push(newevent);
        emit Registered(msg.sender, id, name);
    }

    function createEvent(string memory _name) public {
        events.push(Event(events.length, _name, msg.sender));
    }

    function getEvent(uint256 _eventId) public view returns (string memory, uint256, address) {
        require(_eventId < events.length, "Invalid Event index");
        Event memory returnevents = events[_eventId];
        return (returnevents.name, returnevents.id, returnevents.creator);
    }

    function checkin(string memory _id, uint256 _eventId) public {
        (string memory name, uint256 id, address creator) =  getEvent(_eventId);
        require(msg.sender == creator, "You are not the creator of event");
        require(_eventId < events.length, "Invalid eventId");
        require(hasRegistered[_id][_eventId], "You have not Registered for this event");
        require(!hasCheckedIn[_id][_eventId], "You have already checkedIn");

        hasCheckedIn[_id][_eventId] = true;
        emit CheckedIn(msg.sender, id, name);
    }

    function getListOfUsers(string memory _id) public view returns(Event[] memory) {
        return listOfRegisteredEvents[_id];
    }
}
