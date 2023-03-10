using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Product, ProductToReturnDto>().ForMember(d => d.ProductImages , o => o.MapFrom(s => s.ProductImages.Select( e => e.ImageUrl).ToList()));
        }

    }
}
