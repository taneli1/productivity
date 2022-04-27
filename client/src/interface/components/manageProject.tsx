import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  str_cancel,
  str_delete_project,
  str_input_project_hex_edit,
  str_input_project_name,
  str_manage,
  str_save_changes,
} from "../../assets/strings";
import { IProject } from "../../data/model/project";
import { ProjectState } from "../../data/model/state";
import { str_input_project_hex } from "./../../assets/strings";
import { Button } from "./button";
import { SecondaryButton } from "./buttonSecondary";
import { ColorPicker } from "./colorPicker";
import { ProjectStateSelector } from "./projectStateSelector";

interface MangageProjectProps {
  project: IProject;
  onSubmit: (name: string, color: string, state: ProjectState) => void;
  onDelete: () => void;
}

export const ManageProject: React.FunctionComponent<MangageProjectProps> = ({
  project,
  onSubmit,
  onDelete,
}) => {
  const [newColor, setNewColor] = useState(`${project.hex}`);
  const [name, setName] = useState(project.name);
  const [state, setState] = useState(project.state);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(name, newColor, state);
  };

  return (
    <>
      <SecondaryButton onClick={handleShow} text={str_manage}>
        <svg
          style={{
            width: 24,
            height: 24,
            color: project.hex,
          }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 9H13V3H21V9M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L13 18.06M11 13H3V3H11V13M11 21H3V15H11V21Z"
          />
        </svg>
      </SecondaryButton>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="pop">{str_manage}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {/* Name */}
          <div className="form-group">
            <label className="pop">{str_input_project_name}</label>
            <input
              value={name}
              onChange={handleNameChange}
              type="text"
              className="form-control"
            />
          </div>

          {/* Color */}
          <div className="form-group pt-4">
            <label className="pop">{str_input_project_hex}</label>
            <p className="centered">{str_input_project_hex_edit}</p>
            <div className="centered px-3">
              <ColorPicker
                color={newColor}
                onColorChanged={(value) => setNewColor(value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="pop pt-4">
            <ProjectStateSelector
              value={state}
              onChanged={(value) => {
                setState(value);
              }}
            />
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          {/* {projectCreationRes.isLoading() && (
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
          )} */}

          <div>
            <Button
              enabled={name.length > 1}
              text={str_delete_project}
              onClick={onDelete}
              color={"#E53A3A"}
            />
          </div>
          <div className="d-flex">
            <button className="btn btn-default" onClick={handleClose}>
              {str_cancel}
            </button>
            <Button
              enabled={name.length > 1}
              text={str_save_changes}
              onClick={handleSubmit}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
