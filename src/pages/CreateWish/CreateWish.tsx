import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as watcherTypes from '../../store/actions/watcherTypes';

// MUI
import {
	Typography,
	TextField,
	Button,
	FormControl,
	Input,
	InputAdornment,
	FormHelperText,
	InputLabel,
} from '@material-ui/core';

// Styles
import * as Styled from './stylesCreateWish';

// Types
import { Wish, WishInput } from '../../types/WishTypes';

// Components
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

export const CreateWish: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const location = useLocation();
	// Validation
	const {
		handleSubmit,
		register,
		errors,
		triggerValidation,
		setValue,
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			link: '',
			price: '',
		},
	});

	const handleTriggerValidation = async (
		event: React.FocusEvent<HTMLInputElement>
	) => {
		triggerValidation(event.target.getAttribute('name')!);
	};

	// Edit mode
	const [originalId, setOriginalID] = useState<string | null>();
	useEffect(() => {
		if (location) {
			if (location.state) {
				const locState = location.state as { originalData: Wish };
				const originalData = locState.originalData;
				(Object.keys(originalData) as Array<keyof Wish>).forEach(
					key => {
						if (key !== '_id' && originalData[key]) {
							setValue(key, originalData[key]);
						}
					}
				);
				setOriginalID(originalData._id);
			}
		}
	}, [location, location.state, setValue]);

	// Submiting
	const onSubmit = (formData: any) => {
		// Correct not full links
		if (
			formData.link &&
			!formData.link.startsWith('http') &&
			!formData.link.startsWith('//')
		) {
			formData.link = '//' + formData.link;
		}
		// Remove blank fields
		Object.keys(formData).forEach(key => {
			if (formData[key] === '') {
				delete formData[key];
			}
		});
		const clearedFormData: WishInput = formData;
		if (originalId) {
			clearedFormData._id = originalId;
		}
		dispatch({
			type: watcherTypes.WATCH_CREATE_WISH,
			payload: {
				...clearedFormData,
				price: parseInt(clearedFormData.price as string),
			},
		});
		history.push('/lista-zyczen');
	};

	// Allegro API autocompleate
	const checkURL = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const url = event.target.value;
		if (url.includes('allegro.pl')) {
            // Find allegro item ID
			const idRegex = new RegExp(/-\d{9,12}$/gm);
			const foundIdArr = url.match(idRegex);
			if (foundIdArr?.length === 1) {
                console.log('LINK CHANGED')
                const foundId = foundIdArr[0]; 
				const slicedId = foundId.slice(1);
				console.log(slicedId);
                try {
                    const graphqlQuery={
                        query: `{getAllegroItemData(itemId: "${slicedId}"){itemPrice}}`,
                    };
                    const response = await axios.post('graphql', graphqlQuery);
                    console.log(response.data)
                } catch (err) {
                    console.log(err)
                }
			}
		}
	};

	return (
		<PageWrapper>
			<Typography variant='h4' component='h2' align='center'>
				{originalId ? 'Edytuj ' : 'Utwórz '} życzenie
			</Typography>
			<Styled.MyForm onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={errors.hasOwnProperty('title')}
					helperText={
						errors.title
							? 'Nazwa życzenia powinna zawierać co najmniej 3 znaki'
							: 'Np. skarpetki w kropki'
					}
					label='Nazwa życzenia'
					margin='normal'
					inputRef={register({ required: true, minLength: 3 })}
					name='title'
					onBlur={handleTriggerValidation}
					autoComplete='off'
				/>
				<TextField
					error={errors.hasOwnProperty('description')}
					helperText={
						'Np. rozmiar, kolor, gdzie kupić i inne przydatne informacje o prezencie'
					}
					label='Opis prezentu'
					multiline
					rowsMax={10}
					margin='normal'
					name='description'
					inputRef={register()}
					autoComplete='off'
				/>
				<TextField
					error={errors.hasOwnProperty('link')}
					helperText={
						errors.link
							? 'Podaj prawidłowy adres URL'
							: 'Jeśli posiadasz dołącz link do zdjęcia lub specyfikacji prezentu np. na stronie jego producenta'
					}
					label='Link'
					margin='normal'
					name='link'
					inputRef={register({
						pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
					})}
					onBlur={handleTriggerValidation}
					onChange={url => checkURL(url)}
					autoComplete='off'
				/>
				<FormControl
					margin='normal'
					error={errors.hasOwnProperty('price')}
				>
					<InputLabel>Orientacyjna cena</InputLabel>
					<Input
						type='number'
						name='price'
						inputRef={register({ required: true, min: 1 })}
						onBlur={handleTriggerValidation}
						endAdornment={
							<InputAdornment position='end'>zł</InputAdornment>
						}
						autoComplete='off'
					/>
					{errors.price && (
						<FormHelperText>
							Podanie orientacyjnej ceny prezentu jest wymagane
						</FormHelperText>
					)}
				</FormControl>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					style={{ marginTop: '1rem' }}
				>
					Zapisz życzenie
				</Button>
			</Styled.MyForm>
		</PageWrapper>
	);
};
