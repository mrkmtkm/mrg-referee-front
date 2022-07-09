import React, { useState, FunctionComponent, useEffect } from 'react';
import { Form, Col, FormGroup, Row } from 'react-bootstrap';
import { Gender, UserSignupForm } from '@/entities';

import { DateTime } from 'luxon';
import { FormOptions } from './form_options';
interface Props {
    signupForm: UserSignupForm;
    handleChangeForm: (params: Partial<UserSignupForm>) => void;
    isConfirm: boolean;
}

export const NewSignupForm: FunctionComponent<Props> = props => {
    const [year, setYear] = useState<number>();
    const [month, setMonth] = useState<number>();
    const [day, setDay] = useState<number>();

    useEffect(() => {
        props.handleChangeForm({
            birthday: new Date(`${year}-${month}-${day}`),
        });
    }, [year, month, day]);

    const GenderOptions = () => (
        <>
            <option value=''>選択してください</option>
            <option value={Gender.Male}>男性</option>
            <option value={Gender.Female}>女性</option>
        </>
    );
    const YearOptions = () => {
        const year = [...Array(DateTime.local().year - 1899)]
            .map((_, index) => index)
            .map(value => DateTime.local().year - value)
            .reverse();

        return (
            <>
                <option value=''>年</option>
                {year.map(i => (
                    <option value={i} key={i}>
                        {i}
                    </option>
                ))}
            </>
        );
    };
    const MonthOptions = () => {
        const month = [...Array(12).keys()].map(i => ++i);
        return (
            <>
                <option value=''>月</option>
                {month.map(i => (
                    <option value={i} key={i}>
                        {i}
                    </option>
                ))}
            </>
        );
    };
    const DayOptions = () => {
        if (!year || !month) return <option value=''>日</option>;
        const jsDate = new Date(year, month - 1);
        const day = [...Array(DateTime.fromJSDate(jsDate).daysInMonth)]
            .map((_, index) => index)
            .map(i => ++i);
        return (
            <>
                <option value=''>日</option>
                {day.map(i => (
                    <option value={i} key={i}>
                        {i}
                    </option>
                ))}
            </>
        );
    };
    return (
        <div>
            <Form.Group className='mb-4'>
                <Form.Label>お名前</Form.Label>

                <Form.Control
                    placeholder='名前'
                    value={props.signupForm.name}
                    onChange={e =>
                        props.handleChangeForm({
                            name: e.target.value,
                        })
                    }
                    disabled={props.isConfirm}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>フリガナ</Form.Label>
                <Form.Control
                    pattern='^[ァ-ンヴー]+$'
                    title='全角カナで入力してください'
                    placeholder='フリガナ'
                    value={props.signupForm.kana}
                    onChange={e =>
                        props.handleChangeForm({
                            kana: e.target.value,
                        })
                    }
                    disabled={props.isConfirm}
                    required
                />
            </Form.Group>
            <FormGroup className='mb-4'>
                <Form.Label>性別</Form.Label>
                <Form.Control
                    as='select'
                    className='w-25'
                    required
                    disabled={props.isConfirm}
                    value={props.signupForm.gender || ''}
                    onChange={e =>
                        props.handleChangeForm({
                            gender: e.target.value as Gender,
                        })
                    }
                >
                    <GenderOptions />
                </Form.Control>
            </FormGroup>
            <Form.Group className='mb-4'>
                <Form.Label>生年月日</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            as='select'
                            disabled={props.isConfirm}
                            value={year}
                            onChange={e => setYear(Number(e.target.value))}
                            required
                        >
                            <YearOptions />
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control
                            as='select'
                            disabled={props.isConfirm}
                            value={month}
                            onChange={e => setMonth(Number(e.target.value))}
                            required
                        >
                            <MonthOptions />
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control
                            as='select'
                            disabled={props.isConfirm}
                            value={day}
                            onChange={e => setDay(Number(e.target.value))}
                            required
                        >
                            <DayOptions />
                        </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control
                    className='w-100'
                    placeholder='メールアドレス'
                    type='email'
                    disabled={props.isConfirm}
                    value={props.signupForm.email}
                    onChange={e =>
                        props.handleChangeForm({
                            email: e.target.value,
                        })
                    }
                    required
                />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>電話番号</Form.Label>

                <Form.Control
                    disabled={props.isConfirm}
                    placeholder='電話番号を入力してください'
                    pattern='^0[-0-9]{9,12}$'
                    value={props.signupForm.phone}
                    onChange={e =>
                        props.handleChangeForm({
                            phone: e.target.value,
                        })
                    }
                    required
                />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>希望勤務地</Form.Label>
                <Form.Control
                    as='select'
                    required
                    disabled={props.isConfirm}
                    value={props.signupForm.place || ''}
                    onChange={e =>
                        props.handleChangeForm({
                            place: e.target.value,
                        })
                    }
                >
                    {FormOptions.PlaceOptions()}
                </Form.Control>
            </Form.Group>

            <Form.Group className='mb-4'>
                <Form.Label>希望職種</Form.Label>
                <Form.Control
                    as='select'
                    required
                    disabled={props.isConfirm}
                    value={props.signupForm.jobType || ''}
                    onChange={e =>
                        props.handleChangeForm({
                            jobType: e.target.value,
                        })
                    }
                >
                    {FormOptions.JobTypeOptions()}
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>ご質問・要望など</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={10}
                    disabled={props.isConfirm}
                    value={props.signupForm.body}
                    placeholder='内容を入力してください。'
                    onChange={e =>
                        props.handleChangeForm({
                            body: e.target.value,
                        })
                    }
                />
            </Form.Group>
        </div>
    );
};
