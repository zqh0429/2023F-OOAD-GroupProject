package com.example.springproject.repository;

import com.example.springproject.domain.RoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomInfo,Integer> {

    @Query("SELECT r FROM RoomInfo r WHERE r.roomId = :id")
    public RoomInfo findAllById(@Param("id") int id);
    @Query("SELECT r FROM RoomInfo r WHERE r.room_region = :roomRegion")
    List<RoomInfo> findRoomsByRegion(@Param("roomRegion") String roomRegion);

    @Query("SELECT r FROM RoomInfo r WHERE r.room_building = :roombuilding and r.room_region= :roomregion")
    List<RoomInfo> findRoomsBybuilding(@Param("roomregion") String roomregion,@Param("roombuilding") String roombuilding);


    @Query("SELECT r FROM RoomInfo r WHERE r.room_building = :roombuilding and r.room_region= :roomregion and r.room_floor = :floor")
    List<RoomInfo> findRoomsByfloor(@Param("roomregion") String roomregion,@Param("roombuilding") String roombuilding,@Param("floor") int floor);


    @Query("SELECT r FROM RoomInfo r WHERE r.room_building = :roombuilding and r.room_region= :roomregion and r.room_floor = :room_floor and r.room_number = :room_number")
    List<RoomInfo> findRoomsBynumber(@Param("roomregion") String roomregion,@Param("roombuilding") String roombuilding,@Param("room_floor") int floor,@Param("room_number") int room_number);

    @Query("SELECT r.roomId FROM RoomInfo r ORDER BY r.room_star DESC ")
    List<Integer> findTop50RoomIdsByStarCount();

    @Modifying
    @Transactional
    @Query("UPDATE RoomInfo u SET u.selected = :status WHERE u.roomId = :roomId")
    public boolean updateRoomInfoById(@Param("roomId") int roomId, @Param("status") boolean status);
    public RoomInfo findRoomInfoByRoomId(int room_id);

}
