package com.example.travelApp.dto;

import lombok.*;

public class HotelDto {
    private int id;
    private String name;
    private String address;
    private String mobile;
    private byte[] image;
    private double rating;

    public HotelDto() {}

    public HotelDto(int id, String name, String address, String mobile, byte[] image, double rating) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.mobile = mobile;
        this.image = image;
        this.rating = rating;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private int id;
        private String name;
        private String address;
        private String mobile;
        private byte[] image;
        private double rating;

        public Builder id(int id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder mobile(String mobile) {
            this.mobile = mobile;
            return this;
        }

        public Builder image(byte[] image) {
            this.image = image;
            return this;
        }

        public Builder rating(double rating) {
            this.rating = rating;
            return this;
        }

        public HotelDto build() {
            return new HotelDto(id, name, address, mobile, image, rating);
        }
    }
}
