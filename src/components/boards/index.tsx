import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/src/hooks";
import { updateBoardDetail, resetBoard } from "@/src/slices/board";
