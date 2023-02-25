import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { addNewNotice } from 'api';
import { dateConverter } from './helpers/dateConverter';
import { schemaAddPet } from './helpers/schemaAppPet';
import { FormHeader } from './FormHeader';
import { FormWrap, BackDrop, RadioTwo, LabelText, RadioWrap, Label } from './FormAddNotice.styled';

export const FormAddNotice = () => {
  const [selectedValue, setSelectedValue] = useState('lost/found');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schemaAddPet),
    mode: 'all',
  });

  const categoryName = methods.getValues().category;

  const client = useQueryClient();
  // const { data, isLoading } = useQuery({ queryFn: postNotice(value), queryKey: 'noticeі' });
  const { mutate: create } = useMutation({
    mutationKey: ['notices', 'all', categoryName],
    mutationFn: addNewNotice,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['notices', 'all', categoryName] });
    },
  });
  const handleRadioInputChange = event => {
    setSelectedValue(event.target.value);
    methods.setValue('category', event.target.value);
  };

  const onSubmit = data => {
    console.log(data.birthday);

    // data.birthday = dateConverter(methods.getValues('birthday').$d);
    // console.log(data.birthday);
    const files = data.images;

    console.log(data);

    const formData = new FormData();
    for (const key in data) {
      if (key === 'images') {
        for (const file of files) {
          formData.append(key, file);
        }
        continue;
      }

      formData.append(key, data[key]);
    }
    // create(formData);
    navigate('/');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeModal = e => {
    if (e.target.id === 'backdrop-notice' || e.key === 'Escape') {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return (
    <FormProvider {...methods}>
      <BackDrop onClick={closeModal} id="backdrop-notice">
        <FormWrap>
          <FormHeader />
          {/* <Categories></Categories> */}
          <RadioWrap>
            <Label checked={selectedValue === 'lost/found'}>
              <RadioTwo
                type="radio"
                {...methods.register('category')}
                value="lost/found"
                onChange={handleRadioInputChange}
                checked={selectedValue === 'lost/found'}
              />
              <LabelText>lost/found</LabelText>
            </Label>
            <Label checked={selectedValue === 'in good hands'}>
              <RadioTwo
                type="radio"
                {...methods.register('category')}
                value="in good hands"
                onChange={handleRadioInputChange}
                checked={selectedValue === 'in good hands'}
              />
              <LabelText>in good hands</LabelText>
            </Label>
            <Label checked={selectedValue === 'sell'}>
              <RadioTwo
                type="radio"
                {...methods.register('category')}
                value="sell"
                onChange={handleRadioInputChange}
                checked={selectedValue === 'sell'}
              />
              <LabelText>sell</LabelText>
            </Label>
          </RadioWrap>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{<Outlet />}</form>
          </LocalizationProvider>
        </FormWrap>
      </BackDrop>
    </FormProvider>
  );
};
