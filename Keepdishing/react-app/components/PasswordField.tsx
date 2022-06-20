import { IconButton, Input, InputGroup, InputProps, InputRightElement, useDisclosure, useMergeRefs } from "@chakra-ui/react";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <InputGroup>
      <Input
        id="password"
        ref={mergeRef}
        name="password"
        type={isOpen ? "text" : "password"}
        autoComplete="current-password"
        {...props}
      />
      <InputRightElement mr={6}>
        <IconButton
          variant="link"
          aria-label={isOpen ? "Mask password" : "Reveal password"}
          icon={isOpen ? <HiEyeOff /> : <HiEye />}
          onClick={onClickReveal}
          size="lg"
        />
      </InputRightElement>
    </InputGroup>
  );
});

PasswordField.displayName = "PasswordField";
