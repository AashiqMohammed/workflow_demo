'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  useDisclosure,
  // ModalFooter,
  // ModalCloseButton,
  // Button,
} from '@chakra-ui/react';

import FilterTree from '@/Components/FilterTree';
import ConfirmModal from '../../../../../Components/DialogBox/ConfirmModal';
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { setItem, getItem } from '@/utils';
import PostmanData from "../../../../../../public/files/Workflow.postman_collection.json";

interface IFilterModal {
  isOpen: boolean;
  onClose: VoidFunction;
  exportJson: VoidFunction;
  clientId: number;
}

const FilterModal = ({ isOpen, onClose, clientId }: IFilterModal) => {
  const toast = useToast();
  const [workflowData, setWorkflowData] = useState();
  const inputFile = useRef(null);

  const {
    isOpen: isConfirmOpen,
    onOpen: isConfirmOnOpen,
    onClose: isConfirmClose,
  } = useDisclosure();

  const exportPostmanData = () => {
    const data = PostmanData;
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "workflow.postman_collection.json";
    link.click();
  };
  const exportJson = () => {
    const data = getItem(`workflow_${clientId}`);
    if (
      !data ||
      !Array.isArray(data) ||
      !data.length ||
      !data[0].children ||
      !data[0].children.length
    ) {
      toast({
        title: "Data not found!",
        description: "No saved workflow found for this client",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  const saveData = (data: any = []) => {
    toast({
      title: "Saved!",
      description: "Workflow saved successfully!!",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
    let loadData = data.length ? data : workflowData;
    setItem(loadData, `workflow_${clientId}`);
  };

  const onImport = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        //@ts-ignore
        saveData(JSON.parse(e.target.result));
        onClose();
      };
    }
  };

  const onImportClick = () => {
    if (inputFile?.current) {
      //@ts-ignore
      inputFile.current.click();
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={isConfirmClose}
        closeFilter={onClose}
        header={"Workflow"}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className="grid grid-cols-6">
              <div className="col-start-1 col-end-3">Workflow</div>
              <div className="col-end-7 col-start-4 col-span-3">
                <button
                  className="btn btn-warning text-white-800 mr-4 w-20"
                  onClick={onImportClick}
                >
                  Import
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    ref={inputFile}
                    onChange={onImport}
                  />
                </button>
                <button
                  className="btn btn-info mr-4 w-20 text-white-800"
                  onClick={exportJson}
                >
                  Export
                </button>
                <button
                  className="btn btn-error mr-4 w-20 text-white-800"
                  onClick={exportPostmanData}
                >
                  Collection
                </button>
                <button
                  className="btn btn-success mr-4 w-20 text-white-800"
                  onClick={saveData}
                >
                  Save
                </button>
                <button
                  className="btn btn-accent w-20 text-white-800"
                  onClick={isConfirmOnOpen}
                >
                  Close
                </button>
              </div>
            </div>
          </ModalHeader>

          {/* <ModalCloseButton onClick={onModalClose} /> */}
          <ModalBody minH="80vh">
            <FilterTree
              setWorkflowData={setWorkflowData}
              clientId={clientId}
              // importedData={fileData}
            />
          </ModalBody>
          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;
