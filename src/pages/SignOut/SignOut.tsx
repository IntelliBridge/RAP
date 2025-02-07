import { ButtonGroup, Modal, ModalFooter, ModalRef, ModalToggleButton } from "@trussworks/react-uswds";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "./events";

const SignOut = (): React.ReactElement => {
  const modalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();

  return (
    <>
      <ModalToggleButton modalRef={modalRef} opener type="button" unstyled>
        Log out
      </ModalToggleButton>
      {/* Ensure all required props are passed to Modal */}
      <Modal
        ref={modalRef}
        aria-labelledby="modal-3-heading"
        aria-describedby="modal-3-description"
        id="signout-modal"
        placeholder=""
        // Add other necessary props according to ModalProps
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        role="dialog"
        isInitiallyOpen={false}
        className=""
      >
        <h3>Log out from Status?</h3>
        <ModalFooter>
          <ButtonGroup>
            <ModalToggleButton
              modalRef={modalRef}
              closer
              className="padding-105 text-center"
              onClick={() => {
                handleSignOut(
                  () => {
                    navigate("/logout");
                    window.location.reload();
                  },
                  (errorMsg: string) => {
                    navigate("/");
                    console.error(errorMsg);
                  }
                );
              }}
            >
              Yes, log out
            </ModalToggleButton>
            <ModalToggleButton modalRef={modalRef} unstyled closer>
              Cancel
            </ModalToggleButton>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SignOut;
