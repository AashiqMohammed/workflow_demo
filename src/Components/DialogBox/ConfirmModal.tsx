"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";

interface IConfirmModal {
  isOpen: boolean;
  onClose: VoidFunction;
  closeFilter: VoidFunction;
}
interface IConfirmModal {
  isOpen: boolean;
  onClose: VoidFunction;
  closeFilter: VoidFunction;
  header: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  closeFilter,
  header,
}: IConfirmModal) => {
  const onModalClose = () => {
    closeFilter();
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header || "Workflow"}</ModalHeader>

          <ModalBody>
            All your unsaved changes will be lost, Do you want to quit?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-accent mr-4 w-20" onClick={onModalClose}>
              Yes
            </button>
            <button className="btn btn-success mr-4 w-20" onClick={onClose}>
              No
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
