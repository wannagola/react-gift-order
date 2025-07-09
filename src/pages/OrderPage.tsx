import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from '@emotion/styled';

import { messageCards } from '@/mock/cards';
import { giftItems } from '@/mock/giftItems';
import OrderForm, { OrderFormData } from '@/components/order/OrderForm';

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = giftItems.find((item) => item.id === Number(id));
  const navigate = useNavigate();

  const [selectedCardId, setSelectedCardId] = useState<number>(messageCards[0].id);
  const selectedCard = messageCards.find((c) => c.id === selectedCardId);
  const handleOrderSubmit = (form: OrderFormData) => {
    alert(
      `주문이 완료되었습니다.\n` +
      `상품명: ${product!.name}\n` +
      `구매 수량: ${form.quantity}\n` +
      `발신자 이름: ${form.sender}\n` +
      `메시지: ${form.message}`
    );
    navigate('/');
  };


  if (!product || !selectedCard) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <Container>
      <Section>
        <SectionTitle>메시지 카드 선택</SectionTitle>
        <CardSelector>
          {messageCards.map((card) => (
            <MessageCardThumb
              key={card.id}
              src={card.imageUrl}
              alt={card.label}
              isSelected={card.id === selectedCardId}
              onClick={() => setSelectedCardId(card.id)}
            />
          ))}
        </CardSelector>
      </Section>

      <Section>
        <SelectedCardSection>
          <SelectedImage src={selectedCard.imageUrl} alt={selectedCard.label} />
          <CardLabel>{selectedCard.label}</CardLabel>
        </SelectedCardSection>
      </Section>

      <Section>
        <SectionTitle>상품 정보</SectionTitle>
        <ProductSection>
          <ProductThumb src={product.imageURL} alt={product.name} />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <Brand>{product.brandInfo.name}</Brand>
            <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
          </ProductInfo>
        </ProductSection>
      </Section>

      <Section>
        <FormSection>
          <OrderForm onSubmit={handleOrderSubmit} product={product} />
        </FormSection>
      </Section>
    </Container>
  );
};

export default OrderPage;
const Container = styled.div`
  padding-bottom: 100px;
`;

const Section = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textColors.default};
`;

const CardSelector = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
`;

const MessageCardThumb = styled.img<{ isSelected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 2px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.sementicColors.kakaoYellow : 'transparent'};
  cursor: pointer;
`;

const SelectedCardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedImage = styled.img`
  width: 240px;
  border-radius: 16px;
`;

const CardLabel = styled.div`
  margin-top: 8px;
  font-weight: 500;
  font-size: 16px;
`;

const ProductSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #eee;
`;

const ProductThumb = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const Brand = styled.div`
  font-size: 12px;
  color: gray;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColors.default};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
