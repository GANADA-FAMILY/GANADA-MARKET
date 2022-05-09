package com.marketganada.db.entity;

import java.io.Serializable;
import java.util.Objects;

public class LikesId implements Serializable {
    private Long user;
    private Long auction;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LikesId likesId = (LikesId) o;
        return user == likesId.user && auction == likesId.auction;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, auction);
    }
}
