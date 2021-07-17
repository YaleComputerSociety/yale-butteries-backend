'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface
      .addColumn('users', 'position_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'positions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users', ['position_id'], {
          name: 'users_position_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('users', 'college_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users', ['college_id'], {
          name: 'users_college_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('im_games', 'team_1_key', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['team_1_key'], {
          name: 'im_games_team_1_key_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('im_games', 'team_2_key', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['team_2_key'], {
          name: 'im_games_team_2_key_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('im_games', 'sport_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'sports',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('im_games', ['sport_id'], {
          name: 'im_games_sport_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('stats', 'imgame_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'im_games',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('stats', ['imgame_id'], {
          name: 'stats_imgame_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('stats', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('stats', ['user_id'], {
          name: 'stats_user_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('rooms', 'college_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'colleges',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('rooms', ['college_id'], {
          name: 'rooms_college_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'event_type_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'event_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['event_type_id'], {
          name: 'events_event_type_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'recurrence_type_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'recurrence_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['recurrence_type_id'], {
          name: 'events_recurrence_type_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'room_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'rooms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['room_id'], {
          name: 'events_room_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['user_id'], {
          name: 'events_user_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('event_occurrences', 'event_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('event_occurrences', ['event_id'], {
          name: 'event_occurrences_event_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('events', 'approval_status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'approval_statuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('events', ['approval_status_id'], {
          name: 'events_approval_status_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface
      .addColumn('users_event_occurrences', 'attendance_status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'attendance_statuses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() =>
        queryInterface.addIndex('users_event_occurrences', ['attendance_status_id'], {
          name: 'users_event_occurrences_attendance_status_id_idx_fkey',
          using: 'BTREE',
        })
      )

    await queryInterface.addIndex('users_event_occurrences', ['event_occurrence_id'], {
      name: 'users_event_occurrences_event_occurrence_id_idx_fkey',
      using: 'BTREE',
    })

    await queryInterface.addIndex('users_event_occurrences', ['user_id'], {
      name: 'users_event_occurrences_user_id_idx_fkey',
      using: 'BTREE',
    })

    await queryInterface.addIndex('rooms_recurrence_types', ['room_id'], {
      name: 'rooms_recurrence_types_room_id_idx_fkey',
      using: 'BTREE',
    })

    await queryInterface.addIndex('rooms_recurrence_types', ['recurrence_type_id'], {
      name: 'rooms_recurrence_types_recurrence_type_id_idx_fkey',
      using: 'BTREE',
    })

    await queryInterface.addIndex('positions_event_types', ['position_id'], {
      name: 'positions_event_types_position_id_idx_fkey',
      using: 'BTREE',
    })

    await queryInterface.addIndex('positions_event_types', ['event_type_id'], {
      name: 'positions_event_types_event_type_id_idx_fkey',
      using: 'BTREE',
    })
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


    await queryInterface.removeIndex('users', 'idx_college_id')
    await queryInterface.removeIndex('users', 'idx_position_id')
    await queryInterface.removeColumn('users', 'college_id')
    await queryInterface.removeColumn('users', 'position_id')

    await queryInterface.removeIndex('im_games', 'sport_id')
    await queryInterface.removeIndex('im_games', 'team_2_key')
    await queryInterface.removeIndex('im_games', 'team_1_key')

    await queryInterface.removeColumn('im_games', 'sport_id')
    await queryInterface.removeColumn('im_games', 'team_2_key')
    await queryInterface.removeColumn('im_games', 'team_1_key')

    await queryInterface.removeIndex('stats', 'user_id')
    await queryInterface.removeIndex('stats', 'im_game_id')

    await queryInterface.removeColumn('stats', 'user_id')
    await queryInterface.removeColumn('stats', 'imgame_id')

    await queryInterface.removeIndex('rooms', 'college_id')

    await queryInterface.removeColumn('rooms', 'college_id')

    await queryInterface.removeIndex('events', 'room_id')
    await queryInterface.removeIndex('events', 'event_type_id')

    await queryInterface.removeColumn('events', 'room_id')
    await queryInterface.removeColumn('events', 'event_type_id')

    await queryInterface.removeIndex('events', 'user_id')
    await queryInterface.removeColumn('events', 'user_id')

    await queryInterface.removeIndex('event_occurrences', 'event_id')
    await queryInterface.removeColumn('event_occurrences', 'event_id')

    await queryInterface.removeIndex('events', 'approval_status_id')
    await queryInterface.removeColumn('events', 'approval_status_id')

    await queryInterface.removeIndex('users_event_occurrences', 'user_id')
    await queryInterface.removeIndex('users_event_occurrences', 'event_occurrence_id')

    await queryInterface.removeIndex('users_event_occurrences', 'attendance_status_id')
    await queryInterface.removeColumn('users_event_occurrences', 'attendance_status_id')

    await queryInterface.removeIndex('rooms_recurrence_types', 'room_id')
    await queryInterface.removeIndex('rooms_recurrence_types', 'recurrence_type_id')

    await queryInterface.removeIndex('positions_event_types', 'position_id')
    await queryInterface.removeIndex('positions_event_types', 'event_type_id')
  },
}
