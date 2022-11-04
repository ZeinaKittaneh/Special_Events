import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

export const Footer = () => {
    return(
        <footer>
            <Box sx={{backgroundColor: "white", color: "#356CB1", textAlign: "center"}}>
                <Container maxWidth="lg" pb={{xs:5, md:0}} sx={{height: "50px", paddingTop: "15px"}}>
                    Special Events &reg; {new Date().getFullYear()}
                </Container>
            </Box>
        </footer>
    )
}
