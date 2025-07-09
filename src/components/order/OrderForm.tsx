import { useState } from 'react';
import styled from '@emotion/styled';
import { giftItems } from '@/mock/giftItems'; 

type Props = {
  onSubmit: (data: OrderFormData) => void;
  product: typeof giftItems[number]; 
};

export type OrderFormData = {
  message: string;
  sender: string;
  receiver: string;
  phone: string;
  quantity: number;
};

const OrderForm = ({ onSubmit}: Props) => {
  const [form, setForm] = useState<OrderFormData>({
    message: '',
    sender: '',
    receiver: '',
    phone: '',
    quantity: 1,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.message) newErrors.message = '메시지는 반드시 입력 되어야 해요.';
    if (!form.sender) newErrors.sender = '보내는 사람 이름이 반드시 입력 되어야 해요.';
    if (!form.receiver) newErrors.receiver = '받는 사람 이름이 반드시 입력 되어야 해요.';
    if (!/^010\d{8}$/.test(form.phone)) {
      newErrors.phone =
        '받는사람 전화번호가 반드시 입력되고 전화번호 규칙에 맞아야 해요. (01012341234)';
    }
    if (form.quantity < 1) newErrors.quantity = '수량은 1개 이상이어야 해요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof OrderFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [field]: field === 'quantity' ? Number(e.target.value) : e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FieldGroup>
        <Label>보내는 사람</Label>
        <Input
          placeholder="이름을 입력하세요."
          value={form.sender}
          onChange={handleChange('sender')}
        />
        {errors.sender && <ErrorText>{errors.sender}</ErrorText>}
      </FieldGroup>

      <FieldGroup>
        <Label>받는 사람</Label>
        <Input
          placeholder="이름을 입력하세요."
          value={form.receiver}
          onChange={handleChange('receiver')}
        />
        {errors.receiver && <ErrorText>{errors.receiver}</ErrorText>}
      </FieldGroup>

      <FieldGroup>
        <Label>전화번호</Label>
        <Input
          placeholder="01012341234"
          value={form.phone}
          onChange={handleChange('phone')}
        />
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </FieldGroup>

      <FieldGroup>
        <Label>메시지</Label>
        <Input
          placeholder="축하 메시지를 입력하세요."
          value={form.message}
          onChange={handleChange('message')}
        />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
      </FieldGroup>

      <FieldGroup>
        <Label>수량</Label>
        <Input
          type="number"
          min={1}
          value={form.quantity}
          onChange={handleChange('quantity')}
        />
        {errors.quantity && <ErrorText>{errors.quantity}</ErrorText>}
      </FieldGroup>

      <SubmitButton type="submit">주문하기</SubmitButton>
    </Form>
  );
};

export default OrderForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColors.default};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.sementicColors.kakaoYellow};
  color: black;
  font-weight: bold;
  font-size: 16px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
