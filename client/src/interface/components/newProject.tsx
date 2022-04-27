import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  str_cancel,
  str_close_modal,
  str_create,
  str_error,
  str_input_project_name,
  str_new_project,
  str_project_created,
} from "../../assets/strings";
import { IProject } from "../../data/model/project";
import { Result } from "../../data/result";
import { str_input_project_hex } from "./../../assets/strings";
import { Button } from "./button";
import { ColorPicker } from "./colorPicker";

interface NewProjectProps {
  projectCreationRes: Result<IProject>;
  createProject: (name: string, hex: string) => void;
  onCloseCalled: () => void;
}

export const NewProject: React.FunctionComponent<NewProjectProps> = ({
  createProject,
  projectCreationRes,
  onCloseCalled,
}) => {
  const [color, setColor] = useState("#fff");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onCloseCalled();
  };
  const handleShow = () => setShow(true);
  const submitProject = () => {
    createProject(name, color);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Button text={str_new_project} onClick={handleShow}>
        <svg
          style={{ width: 24, height: 24, marginRight: 6 }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          />
        </svg>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="pop">New project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="form-group">
            <label className="pop">{str_input_project_name}</label>
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group pt-4">
            <label className="pop">{str_input_project_hex}</label>
            <div className="centered p-3">
              <ColorPicker
                color={color}
                onColorChanged={(value) => setColor(value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {projectCreationRes.isLoading() && (
            <div className="loading-spinner"></div>
          )}

          {projectCreationRes.isError() && <p className="pop">{str_error}</p>}
          {projectCreationRes.isIdle() && (
            <>
              <button className="btn btn-default" onClick={handleClose}>
                {str_cancel}
              </button>
              <Button
                enabled={name.length > 1 && color !== "#fff"}
                text={str_create}
                onClick={submitProject}
              />
            </>
          )}

          {projectCreationRes.isSuccess() && (
            <>
              <p className="pop">{str_project_created}</p>
              <button className="btn btn-secondary" onClick={handleClose}>
                {str_close_modal}
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
