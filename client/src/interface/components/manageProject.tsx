import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiSlider } from "react-icons/bi";
import {
  str_cancel,
  str_delete_project,
  str_input_project_name,
  str_manage,
  str_ok_delete,
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
  const [deleteConf, setDeleteConf] = useState(false);

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
        <BiSlider size="1.4em" color={project.hex} />
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
            <div className="centered px-3 pt-3">
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
          <div className="flex-fill">
            {!deleteConf ? (
              <Button
                enabled={name.length > 1}
                text={str_delete_project}
                onClick={() => setDeleteConf(true)}
                color={"#E53A3A"}
              />
            ) : (
              <div className="col">
                <p className="centered">
                  Are you sure? This cannot be reverted.
                </p>
                <div className="d-flex centered">
                  <button
                    className="btn btn-default"
                    onClick={() => setDeleteConf(false)}
                  >
                    {str_cancel}
                  </button>
                  <Button
                    enabled={name.length > 1}
                    text={str_ok_delete}
                    onClick={onDelete}
                    color={"#E53A3A"}
                  />
                </div>
              </div>
            )}
          </div>

          {!deleteConf && (
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
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
