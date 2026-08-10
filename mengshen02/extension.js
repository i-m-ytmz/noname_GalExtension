'use strict';
game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "萌神再临_橙", // 扩展包的内部名称
        content: function (config, pack) { 
           },
        precontent: function () { },
        config: {},
        help: {},

        // ================= 【核心包裹层】 =================
        package: {

            // ---------------- 1. 武将注册区 ----------------
            character: {
                // 1.1 登记武将的基本属性（性别、势力、血量、拥有的技能、武将描述和立绘路径）
                character: {
                    //渡来明日香
                    "ms_dulaimingrixiang": ["female", "qun", 3, ["ms_suihu", "ms_shouwang"], ["des:【渡来明日香】<br>原画设计：铃平广", "ext:mengshen02/ms_dulaimingrixiang.jpg"]],

                    //利希安瑟丝
                    "ms_lixiansesi": ["female", "qun", 4, ["ms_zeguang"], ["des:【利希安瑟丝】<br>出自《SHUFFLE!》。<br>神族公主，充满活力与直率。", "ext:mengshen02/ms_lixiansesi.jpg"]],

                    //成田
                    "ms_chengtian": ["male", "qun", 4, ["ms_yequan"], ["des:【成田】<br>新角色。", "ext:mengshen02/ms_chengtian.jpg"]],

                    //大藏理想奈
                    "ms_dazanglixiangnai": ["female", "qun", 3, ["ms_zhefu", "ms_chouhua"], ["des:【大藏理想奈】<br>出自《近月少女的礼仪》。<br>拥有极高的服装设计天赋与敏锐的观察力。", "ext:mengshen02/ms_dazanglixiangnai.jpg"]],

                    //樱小路露娜
                    "ms_yingxiaoluluna": ["female", "qun", 3, ["ms_jiancai", "ms_yongzhu"], ["des:【樱小路露娜】<br>出自《近月少女的礼仪》。<br>才华横溢的服装设计师，个性要强且拥有敏锐的鉴赏力。", "ext:mengshen02/ms_yingxiaoluluna.jpg"]],

                    //伽楼羅
                    "ms_jialouluo": ["male", "qun", "4/6", ["ms_zikui", "ms_mishu"], ["des:【伽楼羅】<br>新武将。", "ext:mengshen02/ms_jialouluo.jpg"]],

                    //千歳
                    "ms_qiansui": ["male", "qun", 3, ["ms_yuebi", "ms_shuixiu"], ["des:【千歳】<br>新武将。", "ext:mengshen02/ms_qiansui.jpg"]],

                    //山科京
                    "ms_yamashinakei": ["female", "qun", 3, ["ms_xueren", "ms_shuangxiang"], ["des:【山科京】<br>3体力，群势力女性武将。<br>一技能【血刃】...<br>二技能【双相】...", "ext:mengshen02/ms_yamashinakei.jpg"]],

                    // 凤翔
                    "ms_fengxiang": ["male", "qun", 4, ["ms_waxin"], ["des:【凤翔】<br>新武将。", "ext:mengshen02/ms_fengxiang.jpg"]],

                    // 羽田鹰志
                    "ms_hanedatakashi": ["male", "qun", 3, ["ms_mingdan", "ms_bishi"], ["des:【羽田鷹志】<br>3体力，群势力男性武将。<br>一技能【明胆】...<br>二技能【避世】...", "ext:mengshen02/ms_hanedatakashi.jpg"]],

                    // 奈莉奈
                    "ms_neilinai": ["female", "qun", 3, ["ms_weineng", "ms_mofeng"], ["des:【奈莉奈】<br>出自《SHUFFLE!》。<br>魔族公主，拥有极其强大的魔力与温柔的性格。", "ext:mengshen02/ms_neilinai.jpg"]],

                    // 大藏衣远
                    "ms_ooguraien": ["male", "qun", 4, ["ms_badao"], ["des:【大藏衣远】<br>4体力，群势力男性武将。<br>一技能【霸道】...<br>", "ext:mengshen02/ms_ooguraien.jpg"]],

                    // 大藏游星
                    "ms_oogurayuusei": ["male", "qun", 3, ["ms_qingcheng", "ms_meiying"], ["des:【大藏游星】<br>3体力，群势力男性武将。<br>一技能【寄托】...<br>二技能【倾城】...", "ext:mengshen02/ms_oogurayuusei.jpg"]],
                },

                // 1.2 登记所有需要在游戏界面中显示的中文翻译
                translate: {

                    // --- 武将名字翻译 ---
                    "ms_lixiansesi": "利希安瑟丝",
                    "ms_dulaimingrixiang": "渡来明日香",
                    "ms_chengtian": "成田",
                    "ms_dazanglixiangnai": "大藏理想奈",
                    "ms_yingxiaoluluna": "樱小路露娜",
                    "ms_jialouluo": "伽楼羅",
                    "ms_qiansui": "千歳",
                    "ms_yamashinakei": "山科京",
                    "ms_fengxiang": "凤翔",
                    "ms_hanedatakashi": "羽田鹰志",
                    "ms_neilinai": "奈莉奈",
                    "ms_ooguraien": "大藏衣远",
                    "ms_oogurayuusei": "大藏游星",
                }
            },

            // ---------------- 2. 卡牌注册区 ----------------
            card: {
                card: {},
                translate: {},
                list: []
            },

            // ---------------- 3. 技能代码区 ----------------
            skill: {
                skill: {

                    // ================= 渡来明日香的技能代码 =================
                    // --- 随护（主技能，负责发放权限） ---
                    "ms_suihu": {
                        global: "ms_suihu_active"
                    },

                    // --- 随护（赋予其他角色的主动发动技） ---
                    "ms_suihu_active": {
                        enable: "phaseUse",
                        usable: 1,
                        filter: function (event, player) {
                            return game.hasPlayer(function (current) {
                                return current !== player && current.hasSkill('ms_suihu');
                            });
                        },
                        filterCard: true,
                        position: "he",
                        selectCard: 1,
                        filterTarget: function (card, player, target) {
                            return target.hasSkill('ms_suihu') && target !== player;
                        },
                        prompt: "交给有【随护】的角色一张牌，令其摸一张牌并展示两张手牌供你使用",
                        // 采用你习惯的框架，配上强大的 async 同步流
                        async content(event, trigger, player) {
                            var target = event.targets[0];

                            // 1. 给牌与摸牌 (使用你原版的 giveAuto)
                            await target.gain(event.cards, player, 'giveAuto');
                            await target.draw();

                            // 2. 宿主展示两张牌
                            var num = Math.min(2, target.countCards('h'));
                            if (num === 0) return;

                            var showResult = await target.chooseCard('h', num, true, '随护：请展示两张手牌供【' + get.translation(player) + '】挑选使用').set('ai', function (card) {
                                return 8 - get.value(card);
                            }).forResult();

                            if (!showResult || !showResult.cards || !showResult.cards.length) return;
                            var showCards = showResult.cards;
                            await target.showCards(showCards);

                            // 3. 挂载你原版的无视距离次数 BUFF
                            player.addTempSkill('ms_suihu_buff');

                            // ============ 严丝合缝植入：谋庞统的使用牌逻辑 ============
                            var links = await player.chooseButton(['随护：请挑选【' + get.translation(target) + '】展示的其中一张牌，无次数与距离限制地使用', showCards])
                                .set('filterButton', function (button) {
                                    var current = get.player();
                                    var card = button.link;
                                    var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                    return current.hasUseTarget(cardx, null, false);
                                })
                                .set('ai', function (button) {
                                    return get.player().getUseValue(button.link);
                                })
                                .forResultLinks();

                            if (links && links.length) {
                                var card = links[0];
                                showCards.remove(card);
                                var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                var owner = get.owner(card);
                                var next = player.chooseUseTarget(cardx, [card], true, false)
                                    .set('throw', false)
                                    .set('owner', owner)
                                    .set('oncard', function (card) {
                                        var eventOwner = get.event().getParent().owner;
                                        if (eventOwner) eventOwner.$throw(card.cards);
                                    });
                                if (card.name === cardx.name && get.is.sameNature(card, cardx, true)) next.set('viewAs', false);
                                await next;
                            }
                            // ========================================================

                            // 4. 卸载 BUFF
                            player.removeSkill('ms_suihu_buff');
                        }
                    },

                    // --- 随护（后台BUFF，提供无视距离和次数的支持） ---
                    "ms_suihu_buff": {
                        mod: {
                            targetInRange: function (card, player, target) { return true; },
                            cardUsable: function (card, player, num) { return Infinity; }
                        }
                    },

                    // --- 守望（主技能） ---
                    "ms_shouwang": {
                        trigger: {
                            global: ["phaseZhunbeiEnd", "phasePandingEnd", "phaseDrawEnd", "phaseUseEnd", "phaseDiscardEnd", "phaseJieshuEnd"]
                        },
                        filter: function (event, player) {
                            return (player.storage.ms_shouwang_count || 0) >= 2;
                        },
                        prompt: "是否发动【守望】令一名角色对你发动【随护】？",
                        async content(event, trigger, player) {
                            // 1. 选人 (原汁原味的 player.chooseTarget)
                            var targetResult = await player.chooseTarget('守望：请选择一名角色，强制令其交给你一张牌并对你发动【随护】', function (card, player, target) {
                                return target.countCards('he') > 0 && target !== player;
                            }).set('ai', function (target) {
                                return get.attitude(player, target);
                            }).forResult();

                            if (!targetResult || !targetResult.targets || !targetResult.targets.length) return;
                            var target = targetResult.targets[0];
                            player.logSkill('ms_shouwang', target);

                            // 2. 目标交牌
                            var giveResult = await target.chooseCard('he', 1, true, '守望：你必须交给【' + get.translation(player) + '】一张牌以对其发动【随护】').set('ai', function (card) {
                                return 8 - get.value(card);
                            }).forResult();

                            if (!giveResult || !giveResult.cards || !giveResult.cards.length) return;

                            // 3. 获得牌并摸牌
                            target.logSkill('ms_suihu_active', player);
                            await player.gain(giveResult.cards, target, 'giveAuto');
                            await player.draw();

                            // 4. 你展示牌
                            var num = Math.min(2, player.countCards('h'));
                            if (num === 0) return;

                            var showResult = await player.chooseCard('h', num, true, '随护：请展示两张手牌供【' + get.translation(target) + '】挑选使用').set('ai', function (card) {
                                return 8 - get.value(card);
                            }).forResult();

                            if (!showResult || !showResult.cards || !showResult.cards.length) return;
                            var showCards = showResult.cards;
                            await player.showCards(showCards);

                            // 5. 挂载你原版的无视距离次数 BUFF
                            target.addTempSkill('ms_suihu_buff');

                            // ============ 严丝合缝植入：谋庞统的使用牌逻辑 ============
                            var links = await target.chooseButton(['随护：请挑选【' + get.translation(player) + '】展示的其中一张牌，无次数与距离限制地使用', showCards])
                                .set('filterButton', function (button) {
                                    var current = get.player();
                                    var card = button.link;
                                    var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                    return current.hasUseTarget(cardx, null, false);
                                })
                                .set('ai', function (button) {
                                    return get.player().getUseValue(button.link);
                                })
                                .forResultLinks();

                            if (links && links.length) {
                                var card = links[0];
                                showCards.remove(card);
                                var cardx = get.autoViewAs({ name: get.name(card), nature: get.nature(card) }, [card]);
                                var owner = get.owner(card);
                                var next = target.chooseUseTarget(cardx, [card], true, false)
                                    .set('throw', false)
                                    .set('owner', owner)
                                    .set('oncard', function (card) {
                                        var eventOwner = get.event().getParent().owner;
                                        if (eventOwner) eventOwner.$throw(card.cards);
                                    });
                                if (card.name === cardx.name && get.is.sameNature(card, cardx, true)) next.set('viewAs', false);
                                await next;
                            }
                            // ========================================================

                            // 6. 卸载 BUFF
                            target.removeSkill('ms_suihu_buff');
                        },
                        group: ["ms_shouwang_tracker1", "ms_shouwang_tracker2"]
                    },

                    // --- 守望幕后机制1：每当任意新段开始，绝对清零记数器 ---
                    "ms_shouwang_tracker1": {
                        trigger: {
                            global: ["phaseZhunbeiBegin", "phasePandingBegin", "phaseDrawBegin", "phaseUseBegin", "phaseDiscardBegin", "phaseJieshuBegin"]
                        },
                        forced: true, silent: true, popup: false,
                        content: function () {
                            player.storage.ms_shouwang_count = 0;
                        }
                    },

                    // --- 守望幕后机制2：万能全覆盖失去牌统计 ---
                    "ms_shouwang_tracker2": {
                        trigger: {
                            player: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "useCardAfter", "equipAfter", "addJudgeAfter"]
                        },
                        forced: true, silent: true, popup: false,
                        filter: function (event, player) {
                            return event.cards && event.cards.length > 0;
                        },
                        content: function () {
                            var num = 0;
                            if (trigger.name === 'useCard' || trigger.name === 'equip' || trigger.name === 'addJudge') {
                                for (var i = 0; i < trigger.cards.length; i++) {
                                    var pos = trigger.cards[i].original;
                                    if (pos === 'h' || pos === 'e' || pos === 'j') num++;
                                }
                            } else {
                                num = trigger.cards.length;
                            }
                            if (typeof player.storage.ms_shouwang_count !== 'number') {
                                player.storage.ms_shouwang_count = 0;
                            }
                            player.storage.ms_shouwang_count += num;
                        }
                    },
                    // ================= 利希安瑟丝的技能 =================
                    // ================= 利希安瑟丝的技能 =================

                    "ms_zeguang": {
                        zhuanhuanji: true,
                        mark: true,
                        intro: {
                            content: function (storage, player) {
                                return player.storage.ms_zeguang ? "发动时：从【目标】开始" : "发动时：从【你】开始";
                            }
                        },
                        enable: "phaseUse",
                        filterTarget: function (card, player, target) {
                            return target !== player;
                        },
                        content: function () {
                            "step 0"
                            // 1. 切换转换技状态
                            if (player.storage.ms_zeguang === undefined) {
                                player.storage.ms_zeguang = false;
                            }
                            event.start_state = player.storage.ms_zeguang; // false: ①从你开始, true: ②从其开始
                            player.storage.ms_zeguang = !player.storage.ms_zeguang;
                            player.syncStorage('ms_zeguang');
                            player.markSkill('ms_zeguang');

                            // 2. 各摸一张牌
                            player.draw();
                            target.draw();

                            "step 1"
                            // 3. 双方展示手牌
                            var h1 = player.getCards('h');
                            var h2 = target.getCards('h');
                            if (h1.length > 0) player.showCards(h1, get.translation(player) + '展示了手牌');
                            if (h2.length > 0) target.showCards(h2, get.translation(target) + '展示了手牌');

                            "step 2"
                            // 4. 初始化顺序，并设置一个计数器，只允许执行2次（双方各1次）
                            event.current_player = event.start_state ? target : player;
                            event.other_player = event.start_state ? player : target;
                            event.zeguang_count = 0; // 核心修改：计数器归零

                            "step 3"
                            // 5. 检查是否已经执行完两次，或者是否有人阵亡，如果是则技能结束
                            if (event.zeguang_count >= 2 || !event.current_player.isAlive() || !event.other_player.isAlive()) {
                                event.finish();
                                return;
                            }

                            var h_current = event.current_player.getCards('h');
                            var h_other = event.other_player.getCards('h');

                            var suits_other = [];
                            for (var i = 0; i < h_other.length; i++) {
                                var s = h_other[i].suit;
                                if (s && s !== 'none' && !suits_other.includes(s)) {
                                    suits_other.push(s);
                                }
                            }

                            var valid_suits = [];
                            for (var i = 0; i < h_current.length; i++) {
                                var s = h_current[i].suit;
                                if (s && s !== 'none' && suits_other.includes(s) && !valid_suits.includes(s)) {
                                    valid_suits.push(s);
                                }
                            }

                            // 如果轮到的这一方选不出相同花色，跳过出牌，直接进入下一方的回合
                            if (valid_suits.length === 0) {
                                game.log(event.current_player, '没有与', event.other_player, '相同的花色，无法使用牌。');
                                event.goto(5);
                                return;
                            }

                            event.current_player.chooseControl(valid_suits).set('prompt', '泽光：请选择一种对方手牌中也包含的花色，将你的该花色的所有手牌当【雷杀】使用').set('ai', function () {
                                var suits_count = {};
                                var h = _status.event.player.getCards('h');
                                for (var i = 0; i < h.length; i++) {
                                    var s = h[i].suit;
                                    if (!suits_count[s]) suits_count[s] = 0;
                                    suits_count[s]++;
                                }
                                var min = 100, best = _status.event.controls[0];
                                for (var i = 0; i < _status.event.controls.length; i++) {
                                    var s = _status.event.controls[i];
                                    if (suits_count[s] < min) {
                                        min = suits_count[s];
                                        best = s;
                                    }
                                }
                                return best;
                            });

                            "step 4"
                            if (result.control) {
                                var chosen_suit = result.control;
                                var use_cards = event.current_player.getCards('h', function (card) {
                                    return card.suit === chosen_suit;
                                });

                                game.log(event.current_player, '将', '#y' + use_cards.length + '张', get.translation(chosen_suit), '花色的手牌当做', '#g【雷杀】', '对', event.other_player, '使用了！');
                                event.current_player.useCard({ name: 'sha', nature: 'thunder' }, use_cards, event.other_player, false);
                            }

                            "step 5"
                            // 这一刀结算完毕后，交换身份，并让计数器 +1
                            var temp = event.current_player;
                            event.current_player = event.other_player;
                            event.other_player = temp;

                            event.zeguang_count++;
                            event.goto(3); // 回到 step 3，如果 count 达到 2 则会自动结束
                        }
                    },

                    // ================= 成田的技能代码 =================

                    // --- 野拳（主技能：主动发动的流程技） ---
                    "ms_yequan": {
                        zhuanhuanji: true,
                        mark: true,
                        intro: {
                            content: function (storage, player) {
                                return player.storage.ms_yequan ? "当前状态：可将【一个区域】的所有牌当【杀】使用" : "当前状态：可将【一种颜色】的所有手牌当【杀】使用";
                            }
                        },
                        // 【核心改变1】：直接声明为出牌阶段主动技，彻底无视引擎那套固执的用杀次数检查！
                        enable: "phaseUse",
                        filter: function (event, player) {
                            if (player.hasSkill('ms_yequan_invalid')) return false;
                            var state2 = player.storage.ms_yequan;
                            if (!state2) {
                                var h = player.getCards('h');
                                for (var i = 0; i < h.length; i++) {
                                    if (get.color(h[i]) !== 'none') return true;
                                }
                                return false;
                            } else {
                                return player.countCards('he') > 0;
                            }
                        },
                        complexCard: true,
                        position: "he",
                        filterCard: function (card, player) {
                            var state2 = player.storage.ms_yequan;
                            if (!state2) {
                                return get.position(card) === 'h' && get.color(card) !== 'none';
                            }
                            return true;
                        },
                        selectCard: [1, Infinity],
                        filterOk: function () {
                            var cards = ui.selected.cards;
                            if (!cards || cards.length === 0) return false;
                            var player = _status.event.player;
                            var state2 = player.storage.ms_yequan;

                            if (!state2) {
                                var color = get.color(cards[0]);
                                if (color === 'none') return false;
                                for (var i = 1; i < cards.length; i++) {
                                    if (get.color(cards[i]) !== color) return false;
                                }
                                var all_color_cards = player.getCards('h', function (c) {
                                    return get.color(c) === color;
                                });
                                return cards.length === all_color_cards.length;
                            } else {
                                var pos = get.position(cards[0]);
                                for (var i = 1; i < cards.length; i++) {
                                    if (get.position(cards[i]) !== pos) return false;
                                }
                                var all_pos_cards = player.getCards(pos);
                                return cards.length === all_pos_cards.length;
                            }
                        },
                        // 【核心改变2】：在这里手动控制目标的合法性，false 参数代表忽略次数限制
                        filterTarget: function (card, player, target) {
                            var virt = { name: "sha", isCard: true };
                            return player.canUse(virt, target, false);
                        },
                        prompt: function () {
                            return _status.event.player.storage.ms_yequan ? "野拳：请选择你手牌区或装备区的所有牌，当做【杀】对一名角色使用" : "野拳：请选择你一种颜色的所有手牌，当做【杀】对一名角色使用";
                        },
                        check: function (card) {
                            return 5 - get.value(card);
                        },
                        content: function () {
                            "step 0"
                            // 将选中的牌组装成虚拟【杀】
                            var virtual_sha = { name: "sha", cards: cards, skill: "ms_yequan", isCard: true };

                            // 【核心破解】：强行打出这张杀，并且挂上 addCount = false！
                            // 这样不仅随便出，引擎还绝对不会把它算进你本回合正常出杀的记录中。
                            var next = player.useCard(virtual_sha, targets, false);
                            next.addCount = false;

                            "step 1"
                            // 【合并功能】：等待那一刀杀执行完毕后，直接在这里结算卡牌数量和摸牌逻辑，一气呵成！
                            var count = cards.length;
                            var last_count = player.storage.ms_yequan_last_count;

                            if (last_count === undefined || count > last_count) {
                                player.draw(2);
                                player.logSkill('ms_yequan');
                                game.log(player, '以此法转化的牌数（' + count + '张）大于上次或为首次，', '#g摸两张牌');
                            } else {
                                player.addTempSkill('ms_yequan_invalid');
                                game.log(player, '以此法转化的牌数（' + count + '张）未大于上次（' + last_count + '张），', '#r【野拳】本回合失效');
                            }

                            // 记录本次消耗的牌数，并翻转转换技状态
                            player.storage.ms_yequan_last_count = count;
                            player.storage.ms_yequan = !player.storage.ms_yequan;
                            player.syncStorage('ms_yequan');
                            player.markSkill('ms_yequan');
                        },
                        group: ["ms_yequan_clear"]
                    },

                    // --- 野拳幕后机制1：每当任意回合开始时，重置所有状态记录 ---
                    "ms_yequan_clear": {
                        trigger: { global: "phaseBefore" },
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function () {
                            delete player.storage.ms_yequan_last_count;
                            player.removeSkill('ms_yequan_invalid');
                        }
                    },

                    // --- 野拳幕后机制2：占位用的失效标签技能 ---
                    "ms_yequan_invalid": {},

                    // ================= 大藏理想奈的技能代码 =================

                    // --- 蛰伏（主技能：花色收集器） ---
                    "ms_zhefu": {
                        forced: true,
                        // 监听所有可能失去牌的时机
                        trigger: { player: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter", "useCardAfter", "equipAfter", "addJudgeAfter"] },
                        filter: function (event, player) {
                            return event.cards && event.cards.length > 0;
                        },
                        content: function () {
                            var suits = player.storage.ms_zhefu || [];
                            var added = false;

                            // 逐一核验失去的牌的花色
                            for (var i = 0; i < trigger.cards.length; i++) {
                                var s = trigger.cards[i].suit;
                                // 剔除无花色的虚拟牌，并检查是否是新花色
                                if (s && s !== 'none' && !suits.includes(s)) {
                                    suits.push(s);
                                    added = true;

                                    // 如果刚好集齐四个花色，立即触发摸牌并清空
                                    if (suits.length >= 4) {
                                        player.storage.ms_zhefu = suits;
                                        player.markSkill('ms_zhefu');

                                        game.log(player, '记录了四个花色，触发了', '#g【蛰伏】');
                                        player.draw(4);

                                        // 为【筹划】增加可用次数
                                        if (typeof player.storage.ms_zhefu_turn_count !== 'number') {
                                            player.storage.ms_zhefu_turn_count = 0;
                                        }
                                        player.storage.ms_zhefu_turn_count++;

                                        // 清空花色记录，开启下一轮收集
                                        suits = [];
                                        added = false;
                                        player.storage.ms_zhefu = [];
                                        player.unmarkSkill('ms_zhefu');
                                        player.syncStorage('ms_zhefu');
                                    }
                                }
                            }

                            // 如果只收集了部分花色，更新面板标记
                            if (added) {
                                player.storage.ms_zhefu = suits;
                                player.syncStorage('ms_zhefu');
                                player.markSkill('ms_zhefu');
                            }
                        },
                        marktext: "伏",
                        intro: {
                            content: function (storage) {
                                if (!storage || storage.length === 0) return "未记录花色";
                                var str = "已记录花色：";
                                var map = { heart: "红桃", diamond: "方块", club: "梅花", spade: "黑桃" };
                                var arr = [];
                                for (var i = 0; i < storage.length; i++) {
                                    arr.push(map[storage[i]] || storage[i]);
                                }
                                return str + arr.join("、");
                            }
                        },
                        group: "ms_zhefu_clear"
                    },

                    // --- 蛰伏/筹划 幕后机制：回合外清空各类记录 ---
                    "ms_zhefu_clear": {
                        trigger: { global: "phaseBefore" },
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function () {
                            delete player.storage.ms_zhefu_turn_count;
                            delete player.storage.ms_chouhua_targets;
                            delete player.storage.ms_chouhua_used_count;
                        }
                    },

                    // --- 筹划（主技能：主动换牌与控顶） ---
                    "ms_chouhua": {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            var max = 1 + (player.storage.ms_zhefu_turn_count || 0);
                            var used = player.storage.ms_chouhua_used_count || 0;
                            if (used >= max) return false;

                            return game.hasPlayer(function (current) {
                                return current.countCards('h') > 0 && !(player.storage.ms_chouhua_targets || []).includes(current);
                            });
                        },
                        filterTarget: function (card, player, target) {
                            return target.countCards('h') > 0 && !(player.storage.ms_chouhua_targets || []).includes(target);
                        },
                        content: function () {
                            "step 0"
                            if (typeof player.storage.ms_chouhua_used_count !== 'number') player.storage.ms_chouhua_used_count = 0;
                            player.storage.ms_chouhua_used_count++;

                            if (!Array.isArray(player.storage.ms_chouhua_targets)) player.storage.ms_chouhua_targets = [];
                            player.storage.ms_chouhua_targets.push(target);

                            var hcards = target.getCards('h');
                            event.num = hcards.length;

                            event.pile_cards = get.cards(event.num);
                            if (event.pile_cards.length === 0) {
                                event.finish();
                                return;
                            }

                            var all_cards = hcards.concat(event.pile_cards);
                            event.all_cards = all_cards;

                            var dialog = ui.create.dialog('筹划：请选择' + event.num + '张牌作为【' + get.translation(target) + '】的手牌', all_cards, 'hidden');
                            player.chooseButton(dialog, event.num, true).set('ai', function (button) {
                                var att = get.attitude(_status.event.player, _status.event.target);
                                var val = get.value(button.link);
                                return att > 0 ? val : -val;
                            }).set('target', target);

                            "step 1"
                            if (result.bool && result.links) {
                                var to_hand = result.links.slice(0);
                                var to_pile = event.all_cards.filter(function (c) { return !to_hand.includes(c); });

                                var old_hand = target.getCards('h');
                                var cards_lost = old_hand.filter(function (c) { return to_pile.includes(c); });
                                var cards_gained = event.pile_cards.filter(function (c) { return to_hand.includes(c); });

                                event.to_pile = to_pile;
                                event.cards_gained = cards_gained;

                                // 【关键修复1】：让失去的牌先进入“虚空（ui.special）”，绝对不要立刻进牌堆！
                                // 此时必定触发【蛰伏】。由于牌在虚空，蛰伏只会从原牌堆顶摸4张全新的牌！
                                if (cards_lost.length > 0) {
                                    target.lose(cards_lost, ui.special, 'to_special').set('getlog', false);
                                }
                            } else {
                                event.to_pile = event.pile_cards;
                                event.cards_gained = [];
                            }

                            "step 2"
                            // 【关键修复2】：蛰伏摸完牌后，目标才正式获得这几张挑好的新手牌
                            if (event.cards_gained && event.cards_gained.length > 0) {
                                target.gain(event.cards_gained, 'draw').set('getlog', false);
                            }

                            "step 3"
                            // 弹出排序面板，对那几张漂浮在虚空里的废牌进行排序
                            if (event.to_pile && event.to_pile.length > 1) {
                                var dialog2 = ui.create.dialog('筹划：请按顺序选择放回牌堆的牌（<font color="red">先选的在最顶端</font>）', event.to_pile, 'hidden');
                                player.chooseButton(dialog2, event.to_pile.length, true).set('ai', function (button) {
                                    return get.value(button.link);
                                });
                            } else {
                                event.goto(5);
                            }

                            "step 4"
                            if (result.bool && result.links && result.links.length === event.to_pile.length) {
                                event.to_pile = result.links.slice(0);
                            }

                            "step 5"
                            // 【关键修复3】：等上面所有的恩怨（lose、蛰伏摸4、gain）全部结算得干干净净了，
                            // 最后再把排好序的牌，安安稳稳地盖到牌堆顶上！
                            if (event.to_pile && event.to_pile.length > 0) {
                                for (var i = event.to_pile.length - 1; i >= 0; i--) {
                                    ui.cardPile.insertBefore(event.to_pile[i], ui.cardPile.firstChild);
                                }
                                game.log(player, '交换了', target, '的部分手牌，并重新排列了牌堆顶');
                            }

                            game.updateRoundNumber();
                        }
                    },

                    // ================= 樱小路露娜的技能代码 =================

                    // --- 剪裁（主技能：极致体验优化版） ---
                    "ms_jiancai": {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return !player.storage.ms_jiancai_1 || !player.storage.ms_jiancai_2;
                        },
                        content: function () {
                            "step 0"
                            var list = [];
                            if (!player.storage.ms_jiancai_1) list.push("展示直到非基本牌，然后分配");
                            if (!player.storage.ms_jiancai_2) list.push("展示直到不可使用，然后无限制使用");

                            player.chooseControl(list, 'cancel2').set('prompt', '剪裁：请选择一项').set('ai', function () {
                                var list = _status.event.controls;
                                if (list.includes("展示直到不可使用，然后无限制使用")) return "展示直到不可使用，然后无限制使用";
                                if (list.includes("展示直到非基本牌，然后分配")) return "展示直到非基本牌，然后分配";
                                return 'cancel2';
                            });

                            "step 1"
                            if (result.control === "展示直到非基本牌，然后分配") {
                                player.storage.ms_jiancai_1 = true;
                                event.mode = 1;
                            } else if (result.control === "展示直到不可使用，然后无限制使用") {
                                player.storage.ms_jiancai_2 = true;
                                event.mode = 2;
                            } else {
                                event.finish();
                                return;
                            }
                            player.markSkill('ms_jiancai');

                            // 瞬间翻牌提取器
                            event.cards = [];
                            var max_search = ui.cardPile.childNodes.length + ui.discardPile.childNodes.length;

                            player.addTempSkill('ms_jiancai_buff');
                            player.storage.ms_jiancai_check_mode = true;

                            for (var i = 0; i < max_search; i++) {
                                var c = get.cards(1)[0];
                                if (!c) break;
                                event.cards.push(c);

                                if (event.mode === 1) {
                                    if (get.type(c) !== 'basic') break;
                                } else {
                                    var usable = player.hasUseTarget(c);
                                    if (!usable) break;
                                }
                            }

                            player.removeSkill('ms_jiancai_buff');
                            delete player.storage.ms_jiancai_check_mode;

                            if (event.cards.length > 0) {
                                player.showCards(event.cards, get.translation(player) + '发动【剪裁】展示了牌');
                            } else {
                                event.goto(9); // 没牌直接清理
                            }

                            "step 2"
                            // 模式分流器
                            if (event.mode === 1) {
                                event.goto(3);
                            } else {
                                event.goto(6);
                            }

                            // ================= 模式1：批量分配（可多选） =================
                            "step 3"
                            if (event.cards.length > 0) {
                                // 【优化】：允许一次性选择 1~所有 张牌
                                var dialog = ui.create.dialog('剪裁：请选择要分配的牌（可多选，点击取消丢弃剩余）', event.cards, 'hidden');
                                player.chooseButton(dialog, [1, event.cards.length]).set('ai', function (button) { return get.value(button.link); });
                            } else {
                                event.goto(9);
                            }

                            "step 4"
                            if (result.bool && result.links) {
                                event.selected_cards = result.links.slice(0); // 记录批量选中的牌
                                player.chooseTarget('请选择将这 ' + event.selected_cards.length + ' 张牌分配给谁', true).set('ai', function (target) {
                                    return get.attitude(_status.event.player, target);
                                });
                            } else {
                                event.goto(9);
                            }

                            "step 5"
                            if (result.bool && result.targets) {
                                var target = result.targets[0];
                                // 批量发牌并从展示池剔除
                                for (var i = 0; i < event.selected_cards.length; i++) {
                                    event.cards.remove(event.selected_cards[i]);
                                }
                                target.gain(event.selected_cards, 'gain2');
                                game.log(player, '将', event.selected_cards.length, '张牌分配给了', target);
                                event.goto(3); // 回到批量分配面板
                            } else {
                                event.goto(9);
                            }

                            // ================= 模式2：原生手牌使用（彻底抛弃弹窗） =================
                            "step 6"
                            player.addTempSkill('ms_jiancai_buff');
                            player.storage.ms_jiancai_check_mode = true;
                            var usable_cards = event.cards.filter(function (c) {
                                return player.hasUseTarget(c);
                            });
                            player.removeSkill('ms_jiancai_buff');
                            delete player.storage.ms_jiancai_check_mode;

                            if (usable_cards.length > 0) {
                                // 【优化】：直接把所有能用的牌塞进你手里，并在底层标记它们
                                player.gain(usable_cards, 'gain2').set('getlog', false);
                                player.storage.ms_jiancai_cards = usable_cards.slice(0);

                                // 把不能用的废牌立刻扔掉
                                var unusable = event.cards.filter(function (c) { return !usable_cards.includes(c); });
                                for (var i = 0; i < unusable.length; i++) {
                                    ui.discardPile.appendChild(unusable[i]);
                                }
                                event.cards = []; // 清空缓存
                            } else {
                                event.goto(9);
                            }

                            "step 7"
                            // 检查手里还有没有剩下的剪裁牌
                            var left = (player.storage.ms_jiancai_cards || []).filter(function (c) {
                                return get.position(c) === 'h' && player.getCards('h').includes(c);
                            });

                            if (left.length > 0) {
                                player.addTempSkill('ms_jiancai_buff');
                                player.addTempSkill('ms_jiancai_use_buff');

                                // 【核心优化】：调用引擎原生出牌接口，你可以直接点击手里的牌去出！
                                player.chooseToUse('剪裁：请直接使用展示的牌（点击取消则丢弃剩余）', function (card, player, event) {
                                    if (!player.storage.ms_jiancai_cards) return false;
                                    return player.storage.ms_jiancai_cards.includes(card);
                                });
                            } else {
                                delete player.storage.ms_jiancai_cards;
                                event.goto(9);
                            }

                            "step 8"
                            player.removeSkill('ms_jiancai_buff');
                            player.removeSkill('ms_jiancai_use_buff');

                            if (result.bool) {
                                // 如果成功使用了一张牌，无限循环回上一步让你继续出
                                event.goto(7);
                            } else {
                                // 如果你点了取消，把手里剩下的剪裁牌全部丢弃
                                var left = (player.storage.ms_jiancai_cards || []).filter(function (c) {
                                    return get.position(c) === 'h' && player.getCards('h').includes(c);
                                });
                                if (left.length > 0) player.discard(left);
                                delete player.storage.ms_jiancai_cards;
                                event.goto(9);
                            }

                            // ================= 终极清理区 =================
                            "step 9"
                            if (event.cards && event.cards.length > 0) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    ui.discardPile.appendChild(event.cards[i]);
                                }
                            }
                            event.cards = [];
                            event.finish();
                        },
                        intro: {
                            content: function (storage, player) {
                                var str = "出牌阶段各限一次：<br>";
                                str += (player.storage.ms_jiancai_1 ? "【分配非基本牌】已使用" : "【分配非基本牌】未使用") + "<br>";
                                str += (player.storage.ms_jiancai_2 ? "【无限使用牌】已使用" : "【无限使用牌】未使用");
                                return str;
                            }
                        },
                        group: ["ms_jiancai_clear"]
                    },

                    // --- 剪裁后台监听1：回合初重置 ---
                    "ms_jiancai_clear": {
                        trigger: { global: "phaseBefore" },
                        forced: true, silent: true, popup: false,
                        content: function () {
                            player.storage.ms_jiancai_1 = false;
                            player.storage.ms_jiancai_2 = false;
                            player.unmarkSkill('ms_jiancai');
                        }
                    },

                    // --- 剪裁后台监听2：距离与次数全开外挂 ---
                    "ms_jiancai_buff": {
                        mod: {
                            targetInRange: function (card, player, target) {
                                if (player.hasSkill('ms_jiancai_buff')) {
                                    if (player.storage.ms_jiancai_check_mode) return true;
                                    if (player.storage.ms_jiancai_cards && player.storage.ms_jiancai_cards.includes(card)) return true;
                                }
                            },
                            cardUsable: function (card, player, num) {
                                if (player.hasSkill('ms_jiancai_buff')) {
                                    if (player.storage.ms_jiancai_check_mode) return Infinity;
                                    if (player.storage.ms_jiancai_cards && player.storage.ms_jiancai_cards.includes(card)) return Infinity;
                                }
                            }
                        }
                    },

                    // --- 剪裁后台监听3：拦截引擎原生记录（完全不占用回合内使用次数） ---
                    "ms_jiancai_use_buff": {
                        trigger: { player: "useCardBefore" },
                        forced: true, popup: false, silent: true,
                        filter: function (event, player) {
                            return player.storage.ms_jiancai_cards && player.storage.ms_jiancai_cards.includes(event.card);
                        },
                        content: function () {
                            trigger.addCount = false;
                        }
                    },

                    // --- 庸主（修复卡死Bug版） ---
                    "ms_yongzhu": {
                        trigger: { global: "phaseDrawBegin" },
                        filter: function (event, player) {
                            return true;
                        },
                        check: function (event, player) {
                            return get.attitude(player, event.player) > 0;
                        },
                        prompt: function (event, player) {
                            return '是否发动【庸主】令【' + get.translation(event.player) + '】取消摸牌，改为由其声明类型并由你为其检索牌堆？';
                        },
                        content: function () {
                            "step 0"
                            // 1. 取消正常的摸牌阶段
                            trigger.cancel();
                            player.logSkill('ms_yongzhu', trigger.player);

                            // 2. 目标角色进行声明
                            trigger.player.chooseControl('basic', 'trick', 'equip').set('prompt', '庸主：请声明一种你想要的卡牌类型（【' + get.translation(player) + '】将为你检索）').set('ai', function () {
                                if (_status.event.player.hp < 2) return 'basic';
                                return 'trick';
                            });

                            "step 1"
                            if (result.control) {
                                event.declared_type = result.control;
                                game.log(trigger.player, '声明了', '#y' + get.translation(event.declared_type) + '牌');

                                var found_cards = [];
                                var temp_stash = [];

                                // 【核心修复】：获取当前游戏内剩余的所有牌的数量作为安全阈值
                                var max_search = ui.cardPile.childNodes.length + ui.discardPile.childNodes.length;

                                // 使用同步安全的 for 循环，瞬间完成所有检索，彻底抛弃危险的 event.goto
                                for (var i = 0; i < max_search; i++) {
                                    if (found_cards.length >= 2) break; // 找齐两张，立马收手

                                    var c = get.cards(1)[0];
                                    if (!c) break; // 牌堆真的一滴都没有了（极端情况），强行终止防止死循环

                                    var t = get.type(c, false);
                                    // 校验类型（兼顾延时锦囊）
                                    if (t === event.declared_type || (event.declared_type === 'trick' && t === 'delay')) {
                                        found_cards.push(c);
                                    } else {
                                        temp_stash.push(c);
                                    }
                                }

                                // 3. 瞬间将不符合的牌倒序塞回牌堆顶（这部分代码现在绝对不会被跳过了！）
                                if (temp_stash.length > 0) {
                                    for (var i = temp_stash.length - 1; i >= 0; i--) {
                                        ui.cardPile.insertBefore(temp_stash[i], ui.cardPile.firstChild);
                                    }
                                    game.updateRoundNumber();
                                }

                                // 4. 将找到的牌交给目标
                                if (found_cards.length > 0) {
                                    trigger.player.gain(found_cards, 'gain2');
                                    game.log(player, '将检索到的', found_cards, '交给了', trigger.player);
                                } else {
                                    game.log('牌堆中没有足够的符合条件的牌');
                                }
                            }
                        }
                    },

                    // ================= 伽楼羅的技能代码 =================

                    // --- 自溃（负面锁定技，可作为病毒传染） ---
                    "ms_zikui": {
                        audio: "ext:mengshen02:2", // 如果你后续要加语音，可以留着这行
                        trigger: { player: "phaseZhunbeiBegin" },
                        forced: true,
                        content: function () {
                            player.loseMaxHp(1);
                        }
                    },

                    // --- 秘术（主控技能：包含体力变化与上限变化两个子效果） ---
                    "ms_mishu": {
                        group: ["ms_mishu_1", "ms_mishu_2"]
                    },

                    // 秘术效果1：体力值变化后传染【自溃】
                    "ms_mishu_1": {
                        // 涵盖无名杀中所有导致体力变化的底层事件
                        trigger: { player: ["damageAfter", "recoverAfter", "loseHpAfter"] },
                        direct: true,
                        filter: function (event, player) {
                            // 场上必须存在没有“自溃”的角色
                            return game.hasPlayer(function (current) {
                                return !current.hasSkill('ms_zikui');
                            });
                        },
                        content: function () {
                            "step 0"
                            player.chooseTarget(get.prompt('ms_mishu'), '令一名没有“自溃”的角色获得“自溃”', function (card, player, target) {
                                return !target.hasSkill('ms_zikui');
                            }).set('ai', function (target) {
                                // AI逻辑：把这个会扣血限的毒药塞给最讨厌的敌人
                                return -get.attitude(_status.event.player, target);
                            });

                            "step 1"
                            if (result.bool && result.targets) {
                                var target = result.targets[0];
                                player.logSkill('ms_mishu', target);

                                // 赋予目标【自溃】，并且它在目标的准备阶段也会正常生效！
                                target.addSkill('ms_zikui');
                                game.log(target, '获得了技能', '#g【自溃】');
                            }
                        }
                    },

                    // 秘术效果2：体力上限变化后的大量制衡与辅助
                    "ms_mishu_2": {
                        // 涵盖无名杀中所有导致体力上限变化的底层事件
                        trigger: { global: ["loseMaxHpAfter", "gainMaxHpAfter", "addMaxHpAfter"] },
                        filter: function (event, player) {
                            return event.player.isAlive();
                        },
                        check: function (event, player) {
                            // AI逻辑：白嫖摸3张牌是绝对的好事，就算给敌人也可以把手里的破铜烂铁塞过去
                            return true;
                        },
                        prompt: function (event, player) {
                            return '是否发动【秘术】摸三张牌并交给【' + get.translation(event.player) + '】三张牌？';
                        },
                        content: function () {
                            "step 0"
                            // 1. 先摸三张牌
                            player.draw(3);

                            "step 1"
                            // 2. 将牌交给目标
                            var target = trigger.player;

                            // 如果触发上限变化的是你自己，相当于摸3给自己3，直接结束
                            if (player === target) {
                                game.log(player, '将三张牌交给了自己');
                                event.finish();
                            }
                            // 如果是其他人，则必须选出3张牌交出去
                            else if (target.isAlive()) {
                                var num = Math.min(3, player.countCards('h')); // 防呆设计，哪怕手牌不足3张也会把剩下的全交
                                if (num > 0) {
                                    player.chooseCard('h', num, true, '请选择交给【' + get.translation(target) + '】的' + num + '张牌').set('ai', function (card) {
                                        var att = get.attitude(_status.event.player, _status.event.target);
                                        // 给队友送好牌，给敌人送废牌
                                        if (att > 0) return get.value(card);
                                        return -get.value(card);
                                    }).set('target', target);
                                } else {
                                    event.finish();
                                }
                            } else {
                                event.finish();
                            }

                            "step 2"
                            // 3. 执行交牌动作
                            if (result.bool && result.cards) {
                                trigger.player.gain(result.cards, player, 'give');
                            }
                        }
                    },

                    // ================= 千歳的技能代码 =================

                    // --- 乐彼：回合外的过牌神技 ---
                    "ms_yuebi": {
                        // 监听：使用牌后 (useCardAfter) 或 打出牌后 (respondAfter)
                        trigger: { player: ["useCardAfter", "respondAfter"] },
                        frequent: true, // 标记为“你可以”的发动类型，系统会自动处理玩家是否勾选了自动发动
                        filter: function (event, player) {
                            // 【核心校验】：逆向追踪当前的事件链，寻找是否存在名为 'phaseUse' (出牌阶段) 的父事件
                            var phase = event.getParent('phaseUse');
                            // 如果找到了出牌阶段，并且这个出牌阶段的主人正是你本人，则不满足“出牌阶段外”的条件
                            if (phase && phase.name === 'phaseUse' && phase.player === player) {
                                return false;
                            }
                            // 反之，只要不是你的出牌阶段（包括别人的回合、你的准备/判定/摸牌/弃牌阶段等），均可发动
                            return true;
                        },
                        content: function () {
                            player.draw();
                        }
                    },

                    // --- 水袖：结束阶段的额外操作 ---
                    "ms_shuixiu": {
                        trigger: { global: "phaseJieshuBegin" }, // 任意角色的结束阶段开始时
                        direct: true, // 直接由代码控制弹窗，不使用默认的发动询问
                        filter: function (event, player) {
                            // 防呆优化：为了防止没有牌可用时频繁弹窗打扰玩家
                            // 遍历你的手牌和装备区，看看是否有能在当前状态下合法使用的牌
                            return player.hasCard(function (card) {
                                return player.hasUseTarget(card);
                            }, 'he');
                        },
                        content: function () {
                            "step 0"
                            // 唤起底层的“自由使用卡牌”面板
                            // set('logSkill') 会在你真正点选使用了一张牌并点确定后，自动在面板上闪烁技能名
                            player.chooseToUse(get.prompt('ms_shuixiu'), '你可以使用一张牌').set('logSkill', 'ms_shuixiu');
                        }
                    },

                    // ================= 山科京的技能代码 =================

                    "ms_xueren": {
                        audio: 2,
                        trigger: { player: "useCard" },
                        filter: function (event, player) {
                            // 必须是基本牌
                            if (get.type(event.card, false) !== 'basic') return false;
                            var name = event.card.name;
                            // 必须是每轮首次使用该牌名
                            if (player.storage.ms_xueren_used && player.storage.ms_xueren_used.includes(name)) return false;
                            return true;
                        },
                        prompt: function (event, player) {
                            return "是否发动【血刃】？（从牌堆中挑选一张牌信息带有“" + get.translation(event.card.name) + "”字眼的牌）";
                        },
                        content: function () {
                            "step 0";
                            var name = trigger.card.name;
                            if (!player.storage.ms_xueren_used) player.storage.ms_xueren_used = [];
                            player.storage.ms_xueren_used.push(name);

                            // 检索牌堆，寻找描述中包含该牌名的牌
                            var keyword = get.translation(name);
                            var pile = Array.from(ui.cardPile.childNodes);
                            var validCards = [];
                            for (var i = 0; i < pile.length; i++) {
                                var cName = pile[i].name;
                                var info = lib.translate[cName + '_info'];
                                if (info && info.includes(keyword)) {
                                    validCards.push(pile[i]);
                                }
                            }

                            // 如果有符合条件的牌，弹出面板让玩家自己选择
                            if (validCards.length > 0) {
                                player.chooseButton([
                                    '请选择获得牌堆中的一张包含“' + keyword + '”字眼的牌',
                                    validCards
                                ]).set('ai', function (button) {
                                    // AI 优先拿高价值的牌
                                    return get.value(button.link);
                                });
                            } else {
                                game.log("牌堆中没有符合条件的牌");
                                event.finish(); // 结束当前事件
                            }

                            "step 1";
                            // 获取玩家的选择结果并执行获得卡牌
                            if (result && result.bool && result.links && result.links.length > 0) {
                                var toGain = result.links[0];
                                toGain.addGaintag("ms_xueren_card");
                                if (!toGain.storage) toGain.storage = {};
                                toGain.storage.ms_xueren_card = true; // 添加卡牌持久级存储标记
                                player.gain(toGain, 'gain2');
                            }
                        },
                        group: ["ms_xueren_clear", "ms_xueren_record", "ms_xueren_catch", "ms_xueren_gain"],
                        subSkill: {
                            // 每轮开始清空记录
                            clear: {
                                trigger: { global: "roundStart" },
                                forced: true,
                                silent: true,
                                content: function () {
                                    player.storage.ms_xueren_used = [];
                                }
                            },
                            // 当玩家使用带有血刃标记的卡牌时，激活捕获开关
                            record: {
                                trigger: { player: "useCard1" },
                                forced: true,
                                silent: true,
                                filter: function (event, player) {
                                    if (event.cards && event.cards.length > 0) {
                                        for (var i = 0; i < event.cards.length; i++) {
                                            if (event.cards[i].storage && event.cards[i].storage.ms_xueren_card) return true;
                                        }
                                    }
                                    return false;
                                },
                                content: function () {
                                    trigger.ms_xueren_active = true;
                                    trigger.ms_xueren_responded = [];
                                }
                            },
                            // 全局监听：任何角色“响应”（打出牌）后，将其抓取进缓存
                            catch: {
                                trigger: { global: "respond" },
                                forced: true,
                                silent: true,
                                filter: function (event, player) {
                                    var evt = event.getParent("useCard");
                                    return evt && evt.ms_xueren_active;
                                },
                                content: function () {
                                    var evt = trigger.getParent("useCard");
                                    if (!evt.ms_xueren_responded) evt.ms_xueren_responded = [];
                                    if (trigger.cards && trigger.cards.length) {
                                        evt.ms_xueren_responded.addArray(trigger.cards);
                                    }
                                }
                            },
                            // 牌结算结束后，将捕获的响应牌收入囊中
                            gain: {
                                trigger: { player: "useCardAfter" },
                                prompt: "是否获得响应此牌的所有牌？",
                                filter: function (event, player) {
                                    if (!event.ms_xueren_active) return false;
                                    if (!event.ms_xueren_responded || event.ms_xueren_responded.length === 0) return false;
                                    var cards = event.ms_xueren_responded.filter(function (c) {
                                        var pos = get.position(c, true);
                                        return pos === 'd' || pos === 'o';
                                    });
                                    return cards.length > 0;
                                },
                                content: function () {
                                    var cards = trigger.ms_xueren_responded.filter(function (c) {
                                        var pos = get.position(c, true);
                                        return pos === 'd' || pos === 'o';
                                    });
                                    if (cards.length) {
                                        player.gain(cards, 'gain2');
                                    }
                                }
                            }
                        }
                    },

                    "ms_shuangxiang": {
                        audio: 2,
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "相",
                        intro: {
                            content: function (storage, player) {
                                if (storage) return "当前状态：已将【血刃】替换为了【咆哮】";
                                return "当前状态：拥有【血刃】";
                            }
                        },
                        // 在任意角色受到伤害后触发（此时 subSkill.count 已经提前完成了计数）
                        trigger: { global: "damageAfter" },
                        forced: true,
                        filter: function (event, player) {
                            // 精确判定：当前受伤害的这个角色，在本回合刚好是第 2 次受伤
                            return event.player.storage.ms_shuangxiang_count === 2;
                        },
                        content: function () {
                            player.draw();
                            player.changeZhuanhuanji("ms_shuangxiang");
                            if (player.storage.ms_shuangxiang) {
                                player.removeSkill("ms_xueren");
                                player.addSkill("paoxiao");
                                game.log(player, "将", "#g【血刃】", "改为了", "#y【咆哮】");
                            } else {
                                player.removeSkill("paoxiao");
                                player.addSkill("ms_xueren");
                                game.log(player, "将", "#y【咆哮】", "改为了", "#g【血刃】");
                            }
                        },
                        group: ["ms_shuangxiang_count", "ms_shuangxiang_clear"],
                        subSkill: {
                            // 核心改动 1：使用 damage 时机（比 damageAfter 更早）来单独给每个受害者记录次数
                            count: {
                                trigger: { global: "damage" },
                                forced: true,
                                silent: true,
                                content: function () {
                                    // 直接在当前受伤的角色身上记录他自己的受伤次数
                                    if (typeof trigger.player.storage.ms_shuangxiang_count !== 'number') {
                                        trigger.player.storage.ms_shuangxiang_count = 0;
                                    }
                                    trigger.player.storage.ms_shuangxiang_count++;
                                }
                            },
                            // 核心改动 2：使用 phaseBeforeStart（每个玩家大回合开始前）清空全场计数
                            clear: {
                                trigger: { global: ["phaseBeforeStart", "roundStart"] },
                                forced: true,
                                silent: true,
                                content: function () {
                                    // 遍历全场存活角色，清空计数
                                    game.countPlayer(function (current) {
                                        current.storage.ms_shuangxiang_count = 0;
                                    });
                                    // 遍历阵亡角色（防止阵亡角色触发 bug 或诈尸后的遗留）
                                    for (var i = 0; i < game.dead.length; i++) {
                                        game.dead[i].storage.ms_shuangxiang_count = 0;
                                    }
                                }
                            }
                        }
                    },

                    // ================= 凤翔的技能代码 =================

                    "ms_waxin": {
                        enable: "phaseUse",
                        filterTarget: function (card, player, target) {
                            // 【限一次校验】：确保该目标在当前阶段还没有被“挖心”过
                            return !player.storage.ms_waxin_targets || !player.storage.ms_waxin_targets.includes(target);
                        },
                        content: function () {
                            "step 0"
                            // 记录该目标，确保本阶段不能再对其使用
                            if (!player.storage.ms_waxin_targets) player.storage.ms_waxin_targets = [];
                            player.storage.ms_waxin_targets.push(target);

                            // 如果目标区域内（手牌、装备区、判定区）有牌，弹出选牌框
                            if (target.countCards('hej') > 0) {
                                // 参数设定为 [1, 最大牌数]。玩家可以选择部分牌点确定，或者直接点击“取消”代表获得0张牌
                                player.choosePlayerCard(target, 'hej', [1, target.countCards('hej')]).set('prompt', '挖心：请选择获得【' + get.translation(target) + '】的任意张牌（点击取消则不获得）');
                            } else {
                                event.goto(2); // 没牌可拿，直接跳到结算给牌步骤
                            }

                            "step 1"
                            // 如果玩家选了牌并点了确定，获得这些牌
                            if (result.bool && result.cards && result.cards.length > 0) {
                                player.gain(result.cards, target, 'giveAuto');
                            }

                            "step 2"
                            // 【核心扫描】：统计目标当前区域内存在的所有花色
                            var t_cards = target.getCards('hej');
                            var has_suits = [];
                            for (var i = 0; i < t_cards.length; i++) {
                                var s = t_cards[i].suit;
                                // 剔除系统可能存在的无花色牌（none）
                                if (s && s !== 'none' && !has_suits.includes(s)) {
                                    has_suits.push(s);
                                }
                            }

                            // 对比并计算出目标当前缺失的花色
                            var all_suits = ['spade', 'heart', 'club', 'diamond'];
                            var missing_suits = all_suits.filter(function (s) {
                                return !has_suits.includes(s);
                            });

                            // 提取你手牌中，所有花色属于“对方缺失花色”的牌
                            var my_hand = player.getCards('h');
                            var cards_to_give = my_hand.filter(function (c) {
                                return missing_suits.includes(c.suit);
                            });

                            // 执行给牌动作
                            if (cards_to_give.length > 0) {
                                target.gain(cards_to_give, player, 'giveAuto');

                                // 将英文花色翻译为中文，方便后台打印酷炫的游戏日志
                                var suit_trans = missing_suits.map(function (s) {
                                    return get.translation(s);
                                });
                                game.log(player, '将', cards_to_give.length, '张', '#y' + suit_trans.join('、'), '花色的手牌交给了', target);
                            } else {
                                game.log(player, '手牌中没有', target, '缺失花色的牌');
                            }
                        },
                        group: ["ms_waxin_clear"]
                    },

                    // --- 挖心后台机制：回合清理器 ---
                    "ms_waxin_clear": {
                        trigger: { global: "phaseBefore" }, // 在任何人的回合开始前，强制清空目标的记录
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function () {
                            delete player.storage.ms_waxin_targets;
                        }
                    },

                    // ================= 羽田的技能代码 =================
                    "ms_mingdan": {
                        audio: 2,
                        enable: "phaseUse",
                        usable: 1,
                        filterTarget: function (card, player, target) {
                            // 目标必须是其他角色，并且有牌（否则无法弃置）
                            return target !== player && target.countCards('he') > 0;
                        },
                        content: function () {
                            "step 0"
                            // 展示目标的手牌
                            if (target.countCards('h') > 0) {
                                target.showHandcards();
                            }

                            // 计算你和目标之间，“可弃置牌数（包括手牌和装备区）”的最小值，即为最大可弃置等量值
                            event.max_discard = Math.min(player.countCards('he'), target.countCards('he'));

                            "step 1"
                            if (event.max_discard > 0) {
                                // 首先，羽田自己选择弃置自己的牌
                                player.chooseToDiscard("he", [1, event.max_discard], "明胆：请选择弃置你自己的1至" + event.max_discard + "张牌").set('ai', function (card) {
                                    // AI 优先弃置价值低的牌
                                    return 8 - get.value(card);
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result && result.bool && result.cards && result.cards.length > 0) {
                                event.num = result.cards.length; // 记录弃置的数量

                                var targetCards = target.getCards('he');
                                // 防止因为前置弃牌触发了某些技能，导致对方当前牌数不够，做个安全兜底
                                var toDiscardNum = Math.min(event.num, targetCards.length);

                                if (toDiscardNum > 0) {
                                    // 弹出面板，让羽田亲自挑选对方的牌来弃置
                                    player.chooseButton([
                                        '明胆：请选择弃置 ' + get.translation(target) + ' 的' + toDiscardNum + '张牌',
                                        targetCards
                                    ], toDiscardNum, toDiscardNum).set('ai', function (button) {
                                        // 嵌套事件内获取主体与目标
                                        var source = _status.event.player;
                                        var dest = _status.event.getParent().target;
                                        var val = get.value(button.link);
                                        // AI 逻辑：如果是队友，帮他弃置烂牌；如果是敌人，撕掉他的好牌
                                        if (get.attitude(source, dest) > 0) {
                                            return -val;
                                        }
                                        return val;
                                    });
                                } else {
                                    event.goto(4); // 对方没牌了，跳过弃牌直接摸牌
                                }
                            } else {
                                event.finish();
                            }

                            "step 3"
                            // 将羽田选中的对方的牌丢入弃牌堆
                            if (result && result.bool && result.links && result.links.length > 0) {
                                target.discard(result.links);
                            }

                            "step 4"
                            if (event.num) {
                                // 你摸 等量 + 1 张牌
                                player.draw(event.num + 1);

                                // 其摸 等量 - 1 张牌
                                var targetDraw = event.num - 1;
                                if (targetDraw > 0) {
                                    target.draw(targetDraw);
                                }
                            }
                        },
                        ai: {
                            order: 9,
                            result: {
                                target: function (player, target) {
                                    if (target.countCards('he') === 0) return 0;
                                    return -1.5; // 评估价值更高，因为是自己挑牌，破坏力极大
                                }
                            }
                        }
                    },

                    "ms_bishi": {
                        audio: 2,
                        // 使用标准的原生触发器：濒死结算结束时
                        trigger: {
                            player: "dyingAfter"
                        },
                        forced: true,
                        filter: function (event, player) {
                            // 只有濒死结算结束后体力值大于0，才说明是“被救活、脱离濒死”，而不是死亡
                            return player.hp > 0;
                        },
                        // 完全采用参考代码的纯净写法，不需要强加 async
                        content: function () {
                            // 计算当前损失的体力值
                            var recoverNum = player.maxHp - player.hp;
                            if (recoverNum > 0) {
                                // 自动排队执行回血
                                player.recover(recoverNum);
                            }
                            // 自动排队执行摸牌
                            player.draw(3);
                        }
                    },

                    // ================= 奈莉奈的技能代码 =================

                    // --- 威能（主技能：无富集的全局传牌与定点爆破） ---
                    "ms_weineng": {
                        enable: "phaseUse",
                        filter: function (event, player) {
                            var list = ['sha', 'shan', 'tao', 'jiu'];
                            var used = player.storage.ms_weineng_used || [];
                            // 只要还有没被声明过的基本牌，就可以发动
                            return list.some(function (name) { return !used.includes(name); });
                        },
                        content: function () {
                            "step 0"
                            var list = ['sha', 'shan', 'tao', 'jiu'];
                            var used = player.storage.ms_weineng_used || [];
                            var controls = list.filter(function (name) { return !used.includes(name); });

                            player.chooseControl(controls).set('prompt', '威能：请选择一种基本牌牌名').set('ai', function () {
                                return _status.event.controls[0];
                            });

                            "step 1"
                            if (result.control) {
                                event.card_name = result.control;
                                if (!player.storage.ms_weineng_used) player.storage.ms_weineng_used = [];
                                player.storage.ms_weineng_used.push(event.card_name);
                                player.markSkill('ms_weineng');

                                player.chooseControl('交给上家', '交给下家').set('prompt', '威能：令所有角色将【' + get.translation(event.card_name) + '】交给谁？');
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control) {
                                event.direction = result.control;
                                game.log(player, '声明了', '#y' + get.translation(event.card_name), '，并令所有角色将其同时', result.control);

                                var moves = [];
                                var players = game.players.slice(0);

                                // 【核心防富集机制】：提前提取快照
                                // 在产生任何卡牌位移之前，先把每个人手里拥有该牌的状况封存进 moves 数组里。
                                for (var i = 0; i < players.length; i++) {
                                    var p = players[i];
                                    var cards = p.getCards('h', function (c) { return c.name === event.card_name; });
                                    if (cards.length > 0) {
                                        var target = (event.direction === '交给上家') ? p.previous : p.next;
                                        moves.push({ from: p, to: target, cards: cards });
                                    }
                                }

                                // 基于快照进行分配，即使B刚刚拿到了A的牌，B传给C的也只会是快照里B原本有的牌！
                                if (moves.length > 0) {
                                    for (var i = 0; i < moves.length; i++) {
                                        var m = moves[i];
                                        m.to.gain(m.cards, m.from, 'giveAuto').set('getlog', false);
                                    }
                                    game.log('所有角色同时完成了【' + get.translation(event.card_name) + '】的传递！');
                                }
                            }

                            "step 3"
                            // 准备依次对每名角色进行清算（从你开始按座次顺序排序）
                            event.targets = game.players.slice(0);
                            event.targets.sort(function (a, b) {
                                return get.distance(player, a, 'absolute') - get.distance(player, b, 'absolute');
                            });

                            "step 4"
                            if (event.targets.length > 0) {
                                var target = event.targets.shift();
                                // 传牌结束后，重新计算他们现在手里该牌名的数量
                                var num = target.getCards('h', function (c) { return c.name === event.card_name; }).length;
                                if (num > 0) {
                                    game.log(target, '当前手牌中有', '#y' + num + '张', get.translation(event.card_name));
                                    player.line(target, 'green');
                                    // 造成等同于牌数的伤害
                                    target.damage(num, player);
                                }
                                event.redo(); // 无缝循环执行下一个目标
                            }
                        },
                        marktext: "威",
                        intro: {
                            content: function (storage) {
                                if (!storage || storage.length === 0) return "尚未声明牌名";
                                var str = "本阶段已声明：<br>";
                                var arr = [];
                                for (var i = 0; i < storage.length; i++) {
                                    arr.push("【" + get.translation(storage[i]) + "】");
                                }
                                return str + arr.join("、");
                            }
                        },
                        group: "ms_weineng_clear"
                    },

                    // --- 威能后台监听：回合初重置声明记录 ---
                    "ms_weineng_clear": {
                        trigger: { global: "phaseBefore" },
                        forced: true, silent: true, popup: false,
                        content: function () {
                            delete player.storage.ms_weineng_used;
                            player.unmarkSkill('ms_weineng');
                        }
                    },

                    // --- 魔风（主技能：精准的印卡与联动） ---
                    "ms_mofeng": {
                        // 监听：任何伤害结算后。通过 filter 过滤必须是你受到或造成的伤害
                        trigger: { global: "damageAfter" },
                        filter: function (event, player) {
                            return event.player === player || event.source === player;
                        },
                        content: function () {
                            "step 0"
                            // 获取本次伤害的点数（几点伤害就执行几次）
                            event.count = trigger.num;

                            "step 1"
                            if (event.count > 0 && trigger.player.isAlive()) {
                                player.chooseControl('杀', '闪', 'cancel2').set('prompt', '魔风：你可以令受伤角色【' + get.translation(trigger.player) + '】获得一张杀或闪？（剩余 ' + event.count + ' 次）').set('ai', function () {
                                    var target = _status.event.getTrigger().player;
                                    var att = get.attitude(_status.event.player, target);
                                    // AI逻辑：如果是队友，发闪保命。
                                    // （高级玩法：如果目标是敌人，你其实可以发杀给他，然后发动【威能】点名杀引爆他！由于 AI 太难实现这一步，默认不对敌人发动）
                                    if (att > 0) return '闪';
                                    return 'cancel2';
                                });
                            } else {
                                event.finish();
                            }

                            "step 2"
                            if (result.control && result.control !== 'cancel2') {
                                // 利用引擎原生印卡系统，凭空生成一张基本牌
                                var card_name = result.control === '杀' ? 'sha' : 'shan';
                                var card = game.createCard(card_name);

                                trigger.player.gain(card, 'gain2');
                                player.logSkill('ms_mofeng', trigger.player);
                                game.log(trigger.player, '获得了', card);

                                // 次数减一，回到上一步继续循环，直到全部点数执行完毕
                                event.count--;
                                event.goto(1);
                            } else {
                                event.finish();
                            }
                        }
                    },

                    // ================= 衣远的技能代码 =================

                    "ms_badao": {
                        audio: 2,
                        group: ["ms_badao_extraDiscard", "ms_badao_damage"],
                        subSkill: {
                            // 效果1：锁定技，其他角色摸牌阶段后追加一个弃牌阶段
                            extraDiscard: {
                                audio: 2,
                                trigger: { global: "phaseDrawAfter" },
                                forced: true,
                                filter: function (event, player) {
                                    // 必须是其他角色，且该角色依然存活
                                    return event.player !== player && event.player.isAlive();
                                },
                                content: function () {
                                    game.log(player, "触发了", "#g【霸道】", "，令", trigger.player, "执行了一个额外的弃牌阶段");
                                    trigger.player.phaseDiscard();
                                }
                            },
                            // 效果2：受到伤害后，令一名角色下个弃牌阶段手牌上限+2或-2
                            damage: {
                                audio: 2,
                                trigger: { player: "damageAfter" },
                                direct: true, // 核心修改：改为 direct: true，跳过原生拦截，进入代码内部手动选人
                                filter: function (event, player) {
                                    return event.num > 0;
                                },
                                content: function () {
                                    "step 0"
                                    // 1. 让玩家手动选择目标
                                    player.chooseTarget("霸道：是否令一名角色下个弃牌阶段手牌上限+2或-2？", function (card, player, target) {
                                        return target.isAlive();
                                    }).set('ai', function (target) {
                                        var source = _status.event.player;
                                        var att = get.attitude(source, target);
                                        if (att > 0 && target.countCards('h') > target.hp) return 1;
                                        if (att < 0 && target.countCards('h') >= target.hp) return 1;
                                        return 0;
                                    });

                                    "step 1"
                                    // 2. 如果选了目标，记录目标，再让玩家选 +2 还是 -2
                                    if (result && result.bool && result.targets && result.targets.length > 0) {
                                        event.myTarget = result.targets[0];
                                        player.chooseControl("+2", "-2", "cancel2")
                                            .set('prompt', '令 ' + get.translation(event.myTarget) + ' 的下个弃牌阶段手牌上限：')
                                            .set('ai', function () {
                                                var att = get.attitude(_status.event.player, _status.event.target);
                                                if (att > 0) return "+2";
                                                if (att < 0) return "-2";
                                                return "cancel2";
                                            }).set('target', event.myTarget);
                                    } else {
                                        event.finish();
                                    }

                                    "step 2"
                                    // 3. 执行修改上限效果
                                    var target = event.myTarget;
                                    if (result && result.control && result.control !== "cancel2" && target) {
                                        player.logSkill("ms_badao", target); // 手动触发技能发光特效
                                        var num = (result.control === "+2" ? 2 : -2);

                                        if (typeof target.storage.ms_badao_limit !== 'number') {
                                            target.storage.ms_badao_limit = 0;
                                        }
                                        target.storage.ms_badao_limit += num;

                                        target.addSkill("ms_badao_effect");
                                        target.markSkill("ms_badao_effect");
                                        game.log(player, "令", target, "下个弃牌阶段的手牌上限", result.control);
                                    }
                                }
                            }
                        }
                    },

                    // 霸道赋予目标的隐藏状态技能（用于实际修改上限并到期自我销毁）
                    "ms_badao_effect": {
                        charlotte: true,
                        marktext: "限",
                        intro: {
                            content: function (storage, player) {
                                var limit = player.storage.ms_badao_limit || 0;
                                return "下个弃牌阶段手牌上限 " + (limit > 0 ? "+" + limit : limit);
                            }
                        },
                        mod: {
                            // 核心修改机制，任何读取该角色手牌上限的结算都会加上此偏移值
                            maxHandcard: function (player, num) {
                                return num + (player.storage.ms_badao_limit || 0);
                            }
                        },
                        // 对方的弃牌阶段结束时，销毁此技能和数值
                        trigger: { player: "phaseDiscardAfter" },
                        forced: true,
                        silent: true,
                        popup: false,
                        content: function () {
                            player.storage.ms_badao_limit = 0;
                            player.removeSkill("ms_badao_effect");
                            player.unmarkSkill("ms_badao_effect");
                        },
                        onremove: function (player) {
                            delete player.storage.ms_badao_limit;
                        }
                    },

                    // ================= 游星的技能代码 =================
                    "ms_qingcheng": {
                        audio: 2,
                        // 【追加 ms_qingcheng_bottom 到组里，确保②一同生效】
                        group: ["ms_qingcheng_damage", "ms_qingcheng_bottom", "ms_qingcheng_clear"],
                        subSkill: {
                            // ================== 原版 ① 逻辑（一字未动） ==================
                            damage: {
                                audio: 2,
                                trigger: { player: "damageAfter", source: "damageAfter" },
                                direct: true,
                                filter: function (event, player) {
                                    return event.num > 0;
                                },
                                content: function () {
                                    "step 0"
                                    // 【第一部分】：处理“给寸目”的效果
                                    var promptStr = (trigger.source === player)
                                        ? "倾城：你造成了伤害，可令一名角色本轮获得【寸目】"
                                        : "倾城：你受到了伤害，可令一名角色本轮获得【寸目】";

                                    player.chooseTarget(promptStr, function (card, player, target) {
                                        return target.isAlive() && !target.hasSkill('ms_cunmu');
                                    }).set('ai', function (target) {
                                        return get.attitude(_status.event.player, target);
                                    });

                                    "step 1"
                                    // 结算“给寸目”
                                    if (result && result.bool && result.targets && result.targets.length > 0) {
                                        var target = result.targets[0];
                                        player.logSkill('ms_qingcheng', target);
                                        target.addSkill('ms_cunmu');
                                        target.addSkill('ms_cunmu_clear');
                                        game.log(player, '令', target, '获得了技能', '#g【寸目】');
                                    }
                                }
                            },

                            // ================== 分离修复后的 ② 逻辑 ==================
                            bottom: {
                                audio: 2,
                                // 【核心修复】：修改为全局监听！现在任何人打任何人，这张牌都会被抓取到！
                                trigger: { global: "damageAfter" },
                                direct: true,
                                filter: function (event, player) {
                                    // 1. 判断是否造成伤害
                                    if (event.num <= 0) return false;
                                    // 2. 限制每回合两次
                                    if ((player.storage.ms_qingcheng_bottom_count || 0) >= 2) return false;

                                    // 3. 复用你的寻牌逻辑，如果没有拿到牌，就不触发技能按钮
                                    var cards = [];
                                    if (event.cards && event.cards.length) cards = Array.from(event.cards);
                                    else if (event.card && event.card.cards && event.card.cards.length) cards = Array.from(event.card.cards);
                                    else if (event.card && get.itemtype(event.card) === 'card') cards = [event.card];

                                    if (!cards.length) {
                                        if (typeof event.getParent === 'function') {
                                            var useEvt = event.getParent('useCard');
                                            if (useEvt && useEvt.cards && useEvt.cards.length) cards = Array.from(useEvt.cards);
                                        }
                                    }

                                    var validCards = cards.filter(function (c) {
                                        return c.parentNode === ui.processing || c.parentNode === ui.discardPile || get.position(c, true) === 'd' || get.position(c, true) === 'o';
                                    });

                                    return validCards.length > 0;
                                },
                                content: function () {
                                    "step 0"
                                    // 【完全照搬你原本的代码】：重新确认可以被移到底部的牌
                                    var cards = [];
                                    if (trigger.cards && trigger.cards.length) cards = Array.from(trigger.cards);
                                    else if (trigger.card && trigger.card.cards && trigger.card.cards.length) cards = Array.from(trigger.card.cards);
                                    else if (trigger.card && get.itemtype(trigger.card) === 'card') cards = [trigger.card];

                                    if (!cards.length) {
                                        if (typeof trigger.getParent === 'function') {
                                            var useEvt = trigger.getParent('useCard');
                                            if (useEvt && useEvt.cards && useEvt.cards.length) cards = Array.from(useEvt.cards);
                                        }
                                    }

                                    var validCards = cards.filter(function (c) {
                                        return c.parentNode === ui.processing || c.parentNode === ui.discardPile || get.position(c, true) === 'd' || get.position(c, true) === 'o';
                                    });

                                    event.validCards = validCards;

                                    if (validCards.length > 0) {
                                        var cardName = get.translation(validCards);
                                        player.chooseBool('倾城：是否将造成伤害的 ' + cardName + ' 置于牌堆底？').set('ai', function () {
                                            return true;
                                        });
                                    } else {
                                        event.finish();
                                    }

                                    "step 1"
                                    // 【完全照搬你原本的代码】：绝佳的底层清除和改放机制
                                    if (result && result.bool) {
                                        if (typeof player.storage.ms_qingcheng_bottom_count !== 'number') {
                                            player.storage.ms_qingcheng_bottom_count = 0;
                                        }
                                        player.storage.ms_qingcheng_bottom_count++;
                                        player.logSkill('ms_qingcheng');

                                        var cardsToBottom = event.validCards;
                                        for (var i = 0; i < cardsToBottom.length; i++) {
                                            var card = cardsToBottom[i];

                                            for (var key in ui.todiscard) {
                                                if (ui.todiscard[key] && ui.todiscard[key].includes(card)) {
                                                    ui.todiscard[key].remove(card);
                                                }
                                            }
                                            if (card.parentNode === ui.discardPile) {
                                                ui.discardPile.removeChild(card);
                                            }

                                            // 使用 evt.parent 而不是 evt.getParent()，安全无坑！
                                            var evt = trigger;
                                            while (evt) {
                                                if (evt.cards && evt.cards.includes(card)) evt.cards.remove(card);
                                                evt = evt.parent;
                                            }

                                            card.fix();
                                            ui.cardPile.appendChild(card);
                                        }
                                        game.updateRoundNumber();
                                        game.log(player, '将', cardsToBottom, '置于了牌堆底');
                                    }
                                }
                            },

                            // ================== 原版清除 逻辑（一字未动） ==================
                            clear: {
                                trigger: { global: "phaseBeforeStart" },
                                forced: true,
                                silent: true,
                                charlotte: true,
                                content: function () {
                                    player.storage.ms_qingcheng_bottom_count = 0;
                                }
                            }
                        }
                    },

                    "ms_cunmu": {
                        mark: true,
                        marktext: "寸",
                        intro: {
                            content: "牌堆在你的视角内上下颠倒（摸牌、判定均从牌堆底进行）"
                        },
                        group: ["ms_cunmu_draw", "ms_cunmu_judge"],
                        subSkill: {
                            draw: {
                                trigger: { player: "drawBegin" },
                                forced: true,
                                silent: true,
                                content: function () {
                                    // 完美调用无名杀底层原生：令摸牌动作直接从底部抽取！
                                    trigger.bottom = true;
                                }
                            },
                            judge: {
                                trigger: { player: "judgeBegin" },
                                forced: true,
                                silent: true,
                                priority: 100,
                                content: function () {
                                    if (ui.cardPile.childNodes.length === 0) {
                                        var c = get.cards(1);
                                        ui.cardPile.appendChild(c[0]);
                                    }
                                    if (ui.cardPile.childNodes.length > 0) {
                                        var bottomCard = ui.cardPile.lastChild;
                                        trigger.card = bottomCard; // 拦截并替换判定牌
                                        bottomCard.remove();
                                    }
                                }
                            }
                        }
                    },

                    "ms_cunmu_clear": {
                        trigger: { global: "roundStart" },
                        forced: true,
                        silent: true,
                        content: function () {
                            player.removeSkill('ms_cunmu');
                            player.removeSkill('ms_cunmu_clear');
                            player.unmarkSkill('ms_cunmu');
                        }
                    },

                    "ms_meiying": {
                        audio: 2,
                        trigger: { player: "useCardAfter" },
                        frequent: true, // 标记为常用技能，玩家可在设置中开启自动发动
                        filter: function (event, player) {
                            if (!event.card) return false;

                            var history = player.getHistory('useCard');
                            var name = get.name(event.card, player);
                            var number = get.number(event.card);

                            var sameName = false;
                            var sameNumber = false;

                            // 遍历本回合的用牌记录，检查同名和同点数
                            for (var i = 0; i < history.length; i++) {
                                var evt = history[i];
                                if (evt === event) continue; // 本张不算
                                if (!sameName && get.name(evt.card, player) === name) sameName = true;
                                if (!sameNumber && number > 0 && get.number(evt.card) === number) sameNumber = true;
                            }

                            // 检查本回合造成伤害的记录，看源头事件是不是当前这张牌
                            var causedDamage = player.getHistory('sourceDamage', function (evt) {
                                return evt.card === event.card || evt.getParent('useCard') === event;
                            }).length > 0;

                            // 只要满足任意一项，即可亮起触发
                            return sameName || sameNumber || causedDamage;
                        },
                        content: function () {
                            "step 0"
                            // 在 content 中再统计一次，以获取具体满足的条件和摸牌数量
                            var history = player.getHistory('useCard');
                            var name = get.name(trigger.card, player);
                            var number = get.number(trigger.card);

                            var sameName = false;
                            var sameNumber = false;

                            for (var i = 0; i < history.length; i++) {
                                var evt = history[i];
                                if (evt === trigger) continue;
                                if (!sameName && get.name(evt.card, player) === name) sameName = true;
                                if (!sameNumber && number > 0 && get.number(evt.card) === number) sameNumber = true;
                            }

                            var causedDamage = player.getHistory('sourceDamage', function (evt) {
                                return evt.card === trigger.card || evt.getParent('useCard') === trigger;
                            }).length > 0;

                            var drawNum = 0;
                            var str = [];
                            if (sameName) { drawNum++; str.push('同名'); }
                            if (sameNumber) { drawNum++; str.push('同点数'); }
                            if (causedDamage) { drawNum++; str.push('造成伤害'); }

                            event.drawNum = drawNum;
                            event.str = str;

                            // 弹出提示框，告诉玩家满足了什么条件，能摸几张
                            player.chooseBool(get.prompt('ms_meiying'), '满足条件（' + str.join('、') + '），是否摸 ' + drawNum + ' 张牌？').set('ai', function () {
                                return true; // AI 默认摸牌
                            });

                            "step 1"
                            if (result && result.bool) {
                                player.logSkill('ms_meiying');
                                game.log(player, '触发了', '#g【魅影】', '（满足条件：' + event.str.join('、') + '）');
                                player.draw(event.drawNum);
                            }
                        }
                    },
                },
                translate: {
                    // --- 技能翻译 ---
                    "ms_suihu": "随护",
                    "ms_suihu_info": "其他角色出牌阶段限一次，其可以交给你一张牌，若如此做你摸一张牌并展示两张牌，其可以无次数与距离限制地使用其中一张牌。",
                    "ms_shouwang": "守望",
                    "ms_shouwang_info": "任意角色的任意段结束时，若你本阶段失去过至少两张牌，你可以令一名角色对你发动“随护”。",

                    // --- 幕后技能/状态翻译 ---
                    "ms_suihu_active": "随护",
                    "ms_suihu_buff": "随护（无视距离与次数限制）",
                    "ms_suihu_use": "随护（选牌面板）",

                    "ms_zeguang": "泽光",
                    "ms_zeguang_info": "<b>转换技，</b>出牌阶段，你可以与一名其他角色各摸一张牌，然后展示你们的手牌，然后①从你开始②从其开始：你们依次将一种对方手牌中也包含的花色的所有手牌当一张【雷杀】对对方使用。",
                    "ms_zeguang_bg": "泽光", // 转换技标记名称

                    "ms_yequan": "野拳",
                    "ms_yequan_info": "<b>转换技</b>，你可以将：<br>①一种颜色的所有手牌<br>②一个区域的所有牌<br>当一张无次数限制的【杀】使用。结算后若你以此法所转化牌数大于本回合你上次发动此技能所转化牌数、或本回合第一次发动此技能，你摸两张牌。否则此技能本回合失效。",
                    "ms_yequan_bg": "野拳",

                    "ms_zhefu": "蛰伏",
                    "ms_zhefu_info": "<b>锁定技，</b>记录你失去牌的花色，当你记录了四个花色后，你摸四张牌并清除记录。",
                    "ms_chouhua": "筹划",
                    "ms_chouhua_info": "出牌阶段限x次(x为本回合触发【蛰伏】次数+1)，你可以观看一名本回合未被你以此法观看过手牌的角色的手牌与牌堆顶等量张牌，并交换其中任意张牌的位置。",
                    "ms_zhefu_bg": "伏",

                    "ms_jiancai": "剪裁",
                    "ms_jiancai_info": "出牌阶段各限一次，你可以：<br>①依次展示牌堆顶一张牌直到展示出非基本牌，然后你分配所有展示牌；<br>②依次展示牌堆顶一张牌直到展示出不可使用的牌，然后你无次数限制且不计入次数地使用所有展示牌。",
                    "ms_yongzhu": "庸主",
                    "ms_yongzhu_info": "一名角色的摸牌阶段开始时，你可以令其取消摸牌并声明一种牌的类型。若如此做，你从上向下检索牌堆，将最先找到的两张符合声明类型的牌交给该角色。",

                    "ms_zikui": "自溃",
                    "ms_zikui_info": "<b>锁定技</b>，准备阶段，你减1点体力上限。",
                    "ms_mishu": "秘术",
                    "ms_mishu_info": "①当你的体力值变化后，你可以令一名没有“自溃”的角色获得“自溃”；②当任意一名角色的体力上限变化后，你可以摸三张牌并交给其三张牌。",

                    "ms_yuebi": "乐彼",
                    "ms_yuebi_info": "当你在你的出牌阶段外使用或打出一张牌后，你可以摸一张牌。",
                    "ms_shuixiu": "水袖",
                    "ms_shuixiu_info": "任意角色的结束阶段，你可以使用一张牌。",

                    "ms_xueren": "血刃",
                    "ms_xueren_info": "每轮你首次使用一种基本牌名后，你可以选择获得牌堆中一张牌信息带此牌名的牌；你使用以此法获得的牌结算后，可以获得所有角色响应此牌的牌。",
                    "ms_shuangxiang": "双相",
                    "ms_shuangxiang_info": "<b>转换技</b>，任意角色在任意回合第二次受到伤害后，你摸一张牌，并将你的第一个技能在“血刃”与“咆哮”之间切换。<br>（额外技能【咆哮】：<b>锁定技，</b>你使用【杀】无次数限制。）",

                    "ms_waxin": "挖心",
                    "ms_waxin_info": "出牌阶段每名角色限一次，你可以获得一名角色任意张牌，然后你将其区域内缺失的花色的手牌全部交给他。",

                    "ms_mingdan": "明胆",
                    "ms_mingdan_info": "出牌阶段限一次，你可以展示一名其他角色的手牌，并分别各自弃置你与其等量张牌；然后你摸等量+1张牌，其摸等量-1张牌。",
                    "ms_bishi": "避世",
                    "ms_bishi_info": "<b>锁定技</b>，当你脱离濒死后，你回复至满体力，并摸三张牌。",

                    "ms_weineng": "威能",
                    "ms_weineng_info": "出牌阶段，每种基本牌牌名限一次，你可以选择一种基本牌名，并令所有角色同时将手牌中此牌名的牌交给其上家或下家。然后你依次对每名角色造成x点伤害（x为其当前手牌中，此牌名牌的数量）。",
                    "ms_mofeng": "魔风",
                    "ms_mofeng_info": "当你受到或造成一点伤害后，你可以令受伤角色获得一张【杀】或【闪】。",
                    "ms_weineng_bg": "威",

                    "ms_badao": "霸道",
                    "ms_badao_info": "<b>锁定技</b>，你令其他角色的摸牌阶段后追加一个弃牌阶段；你受到伤害后，可以令一名角色下个弃牌阶段手牌上限+2或-2。",
                    "ms_badao_effect": "霸道",

                    "ms_qingcheng": "倾城",
                    "ms_qingcheng_info": "每回合限两次，当一张牌造成伤害后，你可以将其置于牌堆底；你受到或造成伤害后，可以令一名角色本轮获得“寸目”。",
                    "ms_cunmu": "寸目",
                    "ms_cunmu_info": "<b>锁定技</b>，牌堆在你的视角内上下颠倒（你的摸牌、判定均从牌堆底进行）。",
                    "ms_oogurayuusei": "大藏游星",
                    "ms_meiying": "魅影",
                    "ms_meiying_info": "当你使用的牌结算后，此牌每满足以下一项，你可摸一张牌：<br>1. 此牌的牌名本回合你之前使用过；<br>2. 此点数的牌本回合之前你使用过；<br>3. 你使用此牌造成了伤害。",

                }
            }
        },

        // ================= 【资源预加载层】 =================
        files: {
            character: [
                "ms_dulaimingrixiang", "ms_lixiansesi", "ms_chengtian", "ms_dazanglixiangnai", "ms_yingxiaoluluna", "ms_jialouluo", "ms_qiansui", "ms_yamashinakei", "ms_fengxiang", "ms_hanedatakashi", "ms_neilinai", "ms_ooguraien", "ms_oogurayuusei"
            ],
            card: [],
            skill: []
        }
    };
});