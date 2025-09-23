"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDraggable,
} from "@heroui/react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteModalProps) {
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader {...moveProps}>{title}</ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter className="flex justify-end gap-2">
              <Button color="secondary" onPress={onClose}>
                No
              </Button>
              <Button color="danger" onPress={onConfirm}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
