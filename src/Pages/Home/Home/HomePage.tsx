import { useGetAllBooksQuery } from "../../../Redux/features/admin/adminApi";

const HomePage = () => {
  const { data: bookResponse} = useGetAllBooksQuery(undefined);
  console.log(bookResponse);
  

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
        voluptatibus magnam repellendus facere vel iste incidunt modi a labore
        laborum delectus quod beatae dicta, eligendi necessitatibus itaque ipsam
        similique eos! Inventore hic impedit a quia, nulla dolore nisi libero
        mollitia cupiditate dicta accusantium animi ipsam amet repellat
        consequuntur ullam laboriosam dignissimos voluptatum, provident
        necessitatibus. Facere voluptatem, nulla illo consequatur, ea quas neque
        dicta temporibus provident asperiores vitae velit minima veritatis
        mollitia molestiae est quidem quibusdam voluptate sit! Molestias
        voluptatem suscipit voluptas optio? Cum exercitationem natus quasi nam.
        Cumque ipsum, harum mollitia quae voluptatum deleniti doloremque. Ipsa
        dignissimos accusantium aut perspiciatis soluta. Voluptas nobis
        reprehenderit neque temporibus commodi tempora ducimus impedit, sunt sit
        eum expedita amet accusantium, delectus ea. Explicabo, porro dolores
        magnam beatae asperiores sit deserunt nobis expedita laborum distinctio,
        voluptates ab itaque? Aperiam similique impedit error odio nihil, natus
        modi alias, unde, adipisci commodi magnam vitae quam mollitia. Rem
        veritatis tenetur voluptatum dolor. Aperiam ad eum officiis officia
        incidunt corporis obcaecati fuga. Harum distinctio reiciendis et nostrum
        temporibus ipsa nobis libero culpa molestias earum facere suscipit
        voluptate, consectetur quibusdam dolor, minima, obcaecati recusandae
        tenetur nesciunt? Distinctio, eveniet. Eius amet quae beatae,
        consequatur minus earum dolore dolores ut fugit reprehenderit tenetur
        quaerat, quas sunt ratione a dolorum! Sequi nostrum nobis, voluptatem
        nam rerum officiis ut ex expedita eligendi corrupti ullam atque quam,
        quas necessitatibus explicabo inventore eaque doloribus dignissimos
        doloremque ad in esse vel. Dignissimos ullam quae soluta suscipit
        blanditiis reiciendis dolorem ad assumenda odit voluptatibus ab placeat
        magni totam ut, aut pariatur! Maiores similique unde ex consectetur
        perferendis alias delectus sed ut! Veniam repellendus adipisci sapiente
        sequi qui quas esse, accusamus nobis vero error quia dolore. Doloremque,
        et autem quia repellat eius, aspernatur quos a aperiam enim laboriosam
        fuga voluptates eveniet nisi nostrum! Magni, dolores? Odit corporis enim
        labore unde error ipsa architecto cupiditate doloremque tenetur. Ipsa
        laboriosam accusamus facilis laudantium expedita et quis quidem nobis?
        Necessitatibus odit similique tempore modi, voluptas non doloribus
        placeat, dolorem nihil repellat laboriosam officiis enim libero harum
        obcaecati fuga optio consequatur ea aperiam ad mollitia aspernatur animi
        dolore. Nisi voluptatem maxime architecto vitae doloremque fuga quae
        molestiae aliquam facilis praesentium animi veritatis inventore
        laudantium, excepturi non quibusdam dicta sequi, debitis aspernatur illo
        perferendis velit enim magnam. Quia atque architecto eaque! Ipsum dolor
        suscipit itaque fugit quam! Nisi quibusdam eaque facilis explicabo
        suscipit ut sed sint sequi pariatur consequuntur. Minus, eos
        dignissimos. Ratione ullam vitae, suscipit corrupti velit mollitia
        adipisci odio nesciunt sequi rerum perferendis veritatis excepturi magni
        accusantium nam recusandae at in nobis unde iste inventore, incidunt
        quos. Doloremque, illum. Aliquam perferendis fugiat fuga sed dicta nemo
        animi quasi veniam rerum dolor. Ex, incidunt. Deleniti atque iure nulla,
        quibusdam maxime explicabo vitae dolor error magni blanditiis vero
        delectus iusto quos, culpa nihil labore inventore. Id consequatur
        blanditiis quaerat aspernatur suscipit optio qui quo labore facere
        nostrum magni similique necessitatibus dolorum laborum velit facilis
        nemo sit numquam beatae maxime, praesentium reiciendis ut aliquam
        voluptatum. Voluptates laboriosam incidunt ratione voluptate quam autem
        recusandae commodi eum.
      </p>
    </div>
  );
};

export default HomePage;
