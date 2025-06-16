import { Modal, Button, ListGroup } from 'react-bootstrap';

export default function FormatModal({ show, onHide, formats, onSelectFormat, videoTitle, thumbnail }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select a Format</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={thumbnail} alt='thumbnail' className='w-100 rounded mb-3' />
        <h5>{videoTitle}</h5>
        <ListGroup>
          {formats.map((format, index) => (
            <ListGroup.Item
              action
              key={index}
              onClick={() => onSelectFormat(format)}
            >
              {format.ext.toUpperCase()} - {format.resolution || format.formatNote} - {format.filesize ? `${(format.filesize / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
