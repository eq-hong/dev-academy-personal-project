import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { delRoom, editRoom } from '../actions'

function Room() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.rooms)
  const selectedRoom = rooms.find((found) => found.id == id)

  const [room, setRoom] = useState({
    room_name: '',
    room_type: '',
    room_notes: '',
    priority: '',
    width: '',
    length: '',
    north: '',
    east: '',
    west: '',
    south: '',
    floor: '',
  })

  useEffect(() => {
    setRoom({
      room_name: selectedRoom?.roomName || '',
      room_type: selectedRoom?.roomType || '',
      room_notes: selectedRoom?.roomNotes || '',
      priority: selectedRoom?.priority || '',
      width: selectedRoom?.width || '',
      length: selectedRoom?.length || '',
      north: selectedRoom?.north || '',
      east: selectedRoom?.east || '',
      west: selectedRoom?.west || '',
      south: selectedRoom?.south || '',
      floor: selectedRoom?.floor || '',
    })
  }, [rooms])

  function handleChange(event) {
    setRoom({ ...room, [event.target.name]: event.target.value })
  }

  const style = {
    marginTop: `2.5%`,
    marginLeft: `2.5%`,
  }

  const roomArea = (room.width)*(room.length)
  const roomWidthPx = (room.width)*50
  const roomLengthPx = (room.length)*50
  const northWindowDiagram = ( room.north ? 'dashed' : 'solid')
  const eastWindowDiagram = ( room.east ? 'dashed' : 'solid')
  const westWindowDiagram = ( room.west ? 'dashed' : 'solid')
  const southWindowDiagram = ( room.south ? 'dashed' : 'solid')
  
  const roomDiagram = {
    border: `#797979`,
    borderWidth: roomBorder(),
    borderStyle: `${northWindowDiagram} ${eastWindowDiagram} ${southWindowDiagram} ${westWindowDiagram}`,
    width: `${roomWidthPx}px`,
    height: `${roomLengthPx}px`,
    textAlign: `center`,
  }

  function roomBorder (){
    if (room.width == 0 || room.length == 0){
      return `0`
    } else {
      `4.5px`
    }
  }


  function removeRoom(evt) {
    evt.preventDefault()
    dispatch(delRoom(id))
    navigate('/house')
  }

  function updateRoom(evt){
    evt.preventDefault()
      dispatch(editRoom(id, room))
      navigate('/house')
  }

  const [isCheckedNorth, setIsCheckedNorth] = useState(selectedRoom?.north)
  const [isCheckedEast, setIsCheckedEast] = useState(selectedRoom?.east)
  const [isCheckedWest, setIsCheckedWest] = useState(selectedRoom?.west)
  const [isCheckedSouth, setIsCheckedSouth] = useState(selectedRoom?.south)

  function handleCheckNorth() {
    setIsCheckedNorth(!isCheckedNorth)
    setRoom({...room, north:!room.north})
    return ( isCheckedNorth ?  room.north=false : room.north=true )
  }
  function handleCheckEast() {
    setIsCheckedEast(!isCheckedEast)
    setRoom({...room, east:!room.east})
    return ( isCheckedEast ?  room.east=false : room.east=true )
  }
  function handleCheckWest() {
    setIsCheckedWest(!isCheckedWest)
    setRoom({...room, west:!room.west})
    return ( isCheckedWest ?  room.west=false : room.west=true )
  }
  function handleCheckSouth() {
    setIsCheckedSouth(!isCheckedSouth)
    setRoom({...room, south:!room.south})
    return ( isCheckedSouth ?  room.south=false : room.south=true )
  }


  return (
    <>
    <section style={style}>
      <h4>Room Form</h4>
      <form>
        Room Name <br></br> <input name="room_name" onChange={handleChange} value={room.room_name} placeholder="eg. main bedroom" /><br></br>
        
        Room Type <br></br> <select id="room_type" name="room_type" onChange={handleChange} value={room.room_type}>
          <option value="" disabled>Select type</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Living">Living</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Other">Other</option></select>  <br></br>
        
        Room Notes <br></br> <textarea name="room_notes" onChange={handleChange} value={room.room_notes} placeholder="eg. large main bedroom with ensuite"/> <br></br>
        
        Priority  <br></br> <select id="priority" name="priority" onChange={handleChange} value={room.priority}>
          <option value="" disabled>Select priority</option>
          <option value="High">High</option>
          <option value="Mid">Mid</option>
          <option value="Low">Low</option></select>  <br></br>

        Room Width <br></br> <input name="width" onChange={handleChange} value={room.width} placeholder="eg. 3" /><br></br>
        Room Length <br></br> <input name="length" onChange={handleChange} value={room.length} placeholder="eg. 3" /><br></br>

        Floor  <br></br> <select id="floor" name="floor" onChange={handleChange} value={room.floor}>
          <option value="" disabled>Select floor</option>
          <option value="Ground / Level 1">Ground / Level 1</option>
          <option value="Level 2">Level 2</option>
          <option value="Level 3">Level 3</option></select>  <br></br>
      
        <input type="checkbox" id="north" name="north" onChange={handleCheckNorth} checked={room.north} value={isCheckedNorth}/> North-facing (Daytime sun)  <br></br>
        <input type="checkbox" id="east" name="east" onChange={handleCheckEast} checked={room.east} value={isCheckedEast}/> East-facing (Morning sun)  <br></br>
        <input type="checkbox" id="west" name="west" onChange={handleCheckWest} checked={room.west} value={isCheckedWest}/> West-facing (Afternoon sun)  <br></br>
        <input type="checkbox" id="south" name="south" onChange={handleCheckSouth} checked={room.south} value={isCheckedSouth}/> South-facing (Indirect sun)  <br></br>

        <br></br><button onClick={updateRoom}>Update</button>&nbsp;<button onClick={removeRoom}>Delete</button>
      </form>

      <div className='add-button'>
        <Link to={`/house`} >
          <button>Back</button> 
        </Link>
      </div>
      
    </section>
    <section>
      
        <div className='centre-room-diagram' style={roomDiagram}>
          <div className='room-diagram-flex'>
            <p className='p-overflow'>{room.room_name}<br></br>{roomArea}sqm</p>
          </div>
        </div>
       
    </section>
  </>
  )
}

export default Room