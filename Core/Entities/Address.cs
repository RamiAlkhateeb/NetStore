﻿using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Address : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string AddressDiscription { get; set; }
        [Required]
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

    }
}