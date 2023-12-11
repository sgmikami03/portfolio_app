"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type EditModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const EditModal = ({ children, isOpen, onClose }: EditModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w="100%" maxW="480px" mx="20px" p="30px" textAlign="center">
        {children}
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
