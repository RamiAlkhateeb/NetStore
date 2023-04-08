﻿using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<DeliveryMethod> _dmRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IGenericRepository<Order> orderRepo,
            IGenericRepository<DeliveryMethod> dmRepo,
            IGenericRepository<Product> productRepo,
            IBasketRepository basketRepo,
            IUnitOfWork unitOfWork)
        {
            _orderRepo = orderRepo;
            _dmRepo = dmRepo;
            _productRepo = productRepo;
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Core.Entities.OrderAggregate.Address shippingAddress)
        {
            // get basket from basketrepo
            var basket = await _basketRepo.GetBasketAsync(basketId);
            // we trust quentities, items, but will check the prices
            // get items from product repo
            var items = new List<OrderItem>(); 
            foreach (var item in basket.Items) 
            {
                var productItem = await  _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id,
                    productItem.Title,
                    productItem.Thumbnail);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            // create order
            var order = new Order(items , buyerEmail,shippingAddress , deliveryMethod , subtotal,"");
            _unitOfWork.Repository<Order>().Add(order);
            // save to db
            try {
                var result = await _unitOfWork.Complete();
                if (result <= 0) return null;
                // delete basket
                await _basketRepo.DeleteBasketAsync(basketId);
            }
            catch (Exception ex) { }

            
            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id , buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}