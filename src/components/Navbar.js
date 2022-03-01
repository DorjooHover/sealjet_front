import {
  Button,
  Stack,
  Grid,
  Box,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box className="nav">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="py-4 px-32 flex"
      >
        <Stack sx={{ flex: 4, display: "flex" }} className="flex-row relative">
          <Link href="/">
            <a className="mr-7 relative h-14 w-24 ">
              <img src="/img/sealjet-logo.png" alt='sealjet_logo'/>
            </a>
          </Link>
          <Link href="/">
            <a className="mx-7 font-medium flex items-center text-white">
              Нүүр
            </a>
          </Link>
          <Link href="/product">
            <a className="mx-7 font-medium flex items-center text-white">
              Бүтээгдэхүүн
            </a>
          </Link>
          <Link href="/material">
            <a className="mx-7 font-medium flex items-center text-white">
              Материал
            </a>
          </Link>

          <Link href="/info">
            <a className="mx-7 font-medium flex items-center text-white">
              Мэдээ
            </a>
          </Link>
          <Link href="/#contacts">
            <a className="mx-7 font-medium flex items-center text-white">
              Холбоо
            </a>
          </Link>

          {/* <Link href="/order">
            <a className="mx-7 font-medium flex items-center text-white">
              Захиалах
            </a>
          </Link> */}
        </Stack>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            flex: 1,
          }}
        >
          <IconButton type="submit" aria-label="search" className="p-0 pl-2">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Бүтээгдэхүүн хайх"
            inputProps={{ "aria-label": "searchh product" }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}
