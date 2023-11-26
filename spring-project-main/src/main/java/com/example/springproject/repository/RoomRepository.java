package com.example.springproject.repository;

import com.example.springproject.domain.RoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomInfo,Integer> {

    @Query("SELECT r FROM RoomInfo r WHERE r.room_id = :id")
    public RoomInfo findAllById(@Param("id") int id);
    @Query("SELECT r.room_id FROM RoomInfo r WHERE r.room_region = :roomRegion")
    List<Integer> findRoomIdsByRegion(@Param("roomRegion") String roomRegion);

    @Query("SELECT r.room_id FROM RoomInfo r WHERE r.room_building = :roombuilding")
    List<Integer> findRoomIdsBybuilding(@Param("roombuilding") String roombuilding);

    @Query("SELECT r.room_id FROM RoomInfo r ORDER BY r.room_star DESC ")
    List<Integer> findTop50RoomIdsByStarCount();

    @Modifying
    @Transactional
    @Query("UPDATE RoomInfo u SET u.selected = :status WHERE u.room_id = :roomId")
    public boolean updateRoomInfoById(@Param("roomId") int roomId, @Param("status") boolean status);


}
