import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link, VStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const MobileDrawer = ({ isOpen, onClose, username }) => {
  return (
    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Link onClick={onClose} to="/" as={RouterLink} style={{ textDecoration: "none" }} fontSize={"24px"} fontWeight={"semibold"}>
                Blog Application
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <VStack align={"left"}>
                <Link onClick={onClose} to={`/${username}/posts`} fontSize={"19px"} style={{ textDecoration: "none" }} as={RouterLink}>Your Posts</Link>
                <Link onClick={onClose} to={`/${username}/liked-posts`} fontSize={"19px"} style={{ textDecoration: "none" }} as={RouterLink}>Liked Posts</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

export default MobileDrawer