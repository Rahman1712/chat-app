import Style from "./Terminal.module.scss";
import classNames from "classnames";
import { Box } from "@mui/material";
import { ReactNode } from "react";


interface TerminalProps {
  children: ReactNode;
  // Add any other props here if needed
}

const iconClass = "fa fa-circle";

function Terminal(props: TerminalProps) {
  

  // const { content } = props;
  const { children } = props;

  return (
    <Box
      component={"section"}
      className={classNames(Style.terminal, Style.shadowed)}
      width={{ xs: '100%', md: '80%' }}
      borderRadius={'0.5rem'}
      mb={'1rem'}
      display="flex"
      flexDirection="column"
    >

      <Box
        sx={{ backgroundColor: '#8c8c8c' }}
        p={'0.5rem'}
        borderRadius={'0.5rem 0.5rem 0 0'}
        fontSize={'1rem'}
        display="flex"
        justifyContent="space-between" 
      >
        <i className={classNames(iconClass, Style.red)} />
        <i className={classNames(iconClass, Style.amber)} />
        <i className={classNames(iconClass, Style.green)} />
      </Box>

      <Box
        py={{ xs: '1rem', md: '2rem' }}
        px={{ xs: '1rem', md: '1rem' }} 
        borderRadius={'0 0 0.5rem 0.5rem'}
        sx={{
          backgroundColor: '#27242f',
          fontSize: '1.5rem',
          fontFamily: 'Courier New, Courier, monospace',
          overflowWrap: 'break-word', 
          flex: 1, 
        }}
      >
        {children}

      </Box>
    </Box>
  );
}

export default Terminal;
