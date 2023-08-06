using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoContext _context;

        public ToDoController(ToDoContext context)
        {
            _context = context;

            if (_context.ToDoItems.Count() == 0)
            {
                _context.ToDoItems.Add(new ToDoItem { Title = "Task 1", Url = "http://example.com", DueDate = DateTime.Now.AddDays(1), IsComplete = false });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<ToDoItem> Get()
        {
            return _context.ToDoItems.ToList();
        }

        [HttpPost]
        public ActionResult<ToDoItem> PostToDoItem(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetToDoItem), new { id = item.Id }, item);
        }

        [HttpGet("{id}")]
        public ActionResult<ToDoItem> GetToDoItem(long id)
        {
            var item = _context.ToDoItems.Find(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPut("{id}")]
        public IActionResult UpdateToDoItem(long id, ToDoItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) when (!_context.ToDoItems.Any(e => e.Id == id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteToDoItem(long id)
        {
            var item = _context.ToDoItems.Find(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(item);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
