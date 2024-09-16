import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarPage.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({ title: '', start: '', end: '' });
  const calendarRef = useRef(null);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: `${selectInfo.startStr}-${title}`, // Generate a unique ID
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      setEvents([...events, newEvent]);
    }
    selectInfo.view.calendar.unselect(); // Clear selection
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEventDetails({
      title: event.title,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : ''
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (eventId) => {
    const eventToDelete = events.find(event => event.id === eventId);
    if (eventToDelete) {
      const confirmation = window.confirm(`Are you sure you want to delete "${eventToDelete.title}"?`);
      if (confirmation) {
        setEvents(events.filter(event => event.id !== eventId));
        const calendarApi = calendarRef.current.getApi();
        const eventToRemove = calendarApi.getEventById(eventId);
        if (eventToRemove) {
          eventToRemove.remove();
        }
      }
    }
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleSaveChanges = () => {
    if (selectedEvent) {
      const updatedEvent = {
        id: selectedEvent.id,
        title: eventDetails.title,
        start: eventDetails.start,
        end: eventDetails.end,
        allDay: selectedEvent.allDay
      };

      setEvents(events.map(event =>
        event.id === selectedEvent.id ? updatedEvent : event
      ));
      const calendarApi = calendarRef.current.getApi();
      const eventToUpdate = calendarApi.getEventById(selectedEvent.id);
      if (eventToUpdate) {
        eventToUpdate.setProp('title', eventDetails.title);
        eventToUpdate.setStart(eventDetails.start);
        eventToUpdate.setEnd(eventDetails.end);
      }
      setShowEditModal(false);
    }
  };

  // Filter and sort upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="calendar-container">
      <div className="sidebar">
        <h4>Upcoming Events</h4>
        <ul>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <li key={event.id}>
                {event.title} <br />
                {new Date(event.start).toLocaleString()}
                <div className="event-actions">
                  <Button
                    variant="link"
                    onClick={() => handleEditClick(event)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDeleteClick(event.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <li>No upcoming events</li>
          )}
        </ul>
      </div>
      <div className="calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          selectable={true}
          editable={true}
          events={events}
          select={handleDateSelect}
        />
      </div>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={eventDetails.title}
                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={eventDetails.start.slice(0, 16)} // Format for <input type="datetime-local">
                onChange={(e) => setEventDetails({ ...eventDetails, start: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={eventDetails.end.slice(0, 16)} // Format for <input type="datetime-local">
                onChange={(e) => setEventDetails({ ...eventDetails, end: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CalendarPage;
