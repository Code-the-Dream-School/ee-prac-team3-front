import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import fetchNotes from 'functions/fetch-notes';
import useSubmit from 'functions/post-note';

import { message } from 'antd';
import useUpdate from 'functions/update-note';

export default function NewNoteForm({
  openPopup,
  setOpenPopup,
  editNote,
  notes,
  setNotes,
}) {
  const { isLoadingEdit, responseEdit, updateNote } = useUpdate();
  const { postNote, isLoading, response } = useSubmit();

  const handleClose = () => {
    setOpenPopup(false);
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      title: editNote?.title || '',
      note: editNote?.note || '',
    },
    onSubmit: async (values) => {
      if (!editNote._id) {
        await postNote(values);
      } else {
        await updateNote(editNote._id, values);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required').min(5).max(50),
      note: Yup.string().required('Required').min(5).max(100),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (response) {
      if (response.success) {
        message.success(response.message);
        setOpenPopup(false);
        resetForm();
        fetchNotes()
          .then((data) => {
            setNotes(data);
          })
          .catch((err) => {
            message.error(response.message);
          });
      } else {
        message.error(response.message);
      }
    }
  }, [response]);

  useEffect(() => {
    if (responseEdit) {
      if (responseEdit.success) {
        message.success(responseEdit.message);
        setOpenPopup(false);
        resetForm();
        fetchNotes()
          .then((data) => {
            setNotes(data);
          })
          .catch((err) => {
            message.error(responseEdit.message);
          });
      } else {
        message.error(responseEdit.message);
      }
    }
  }, [responseEdit]);

  return (
    <>
      <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>
          <div>New Note</div>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <TextField
                    id="standard-textarea"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText style={{ color: '#fa0505' }}>
                    {touched.title && errors.title}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="note">Text</FormLabel>
                  <TextField
                    id="outlined-multiline-static"
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                    rows={4}
                  />
                  <FormHelperText style={{ color: '#fa0505' }}>
                    {touched.note && errors.note}
                  </FormHelperText>
                </FormControl>
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    disabled={isLoading || isLoadingEdit}
                    style={{ textTransform: 'none' }}
                  >
                    {(isLoading || isLoadingEdit) && <CircularProgress />}
                    Submit
                  </Button>
                  <Button
                    style={{ textTransform: 'none' }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
